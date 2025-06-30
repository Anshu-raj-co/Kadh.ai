from flask import Flask, request, jsonify, g
import sqlite3
import os
import signal
import sys
import logging
import atexit
from flask_cors import CORS

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger('kadhai')

app = Flask(__name__)
# Enable CORS for all routes
CORS(app)
# Get the absolute path to the database
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE = os.path.join(BASE_DIR, 'kadhai.db')

# ----------------- Database Connection -----------------
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        logger.info(f"Connecting to database at: {DATABASE}")
        try:
            # Check if database file exists
            if not os.path.exists(DATABASE):
                logger.error(f"Database file not found at: {DATABASE}")
                raise sqlite3.Error("Database file not found")
                
            db = g._database = sqlite3.connect(DATABASE)
            db.row_factory = sqlite3.Row
            
            # Test the connection
            cursor = db.cursor()
            cursor.execute('SELECT 1')
            cursor.close()
            
            logger.info("Database connection successful")
        except sqlite3.Error as e:
            logger.error(f"Database connection error: {e}")
            if db:
                db.close()
            raise
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        try:
            db.commit()  # Ensure any pending transactions are committed
            db.close()
            logger.info("Database connection closed")
        except sqlite3.Error as e:
            logger.error(f"Error closing database connection: {e}")
            try:
                db.close()
            except:
                pass  # If close fails again, we can't do much

# ----------------- Helper to Query DB -----------------
def dict_factory(cursor, row):
    """Convert database row objects to a dictionary"""
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def query_db(query, args=(), one=False, commit=False):
    """Execute a query and return the results"""
    conn = None
    try:
        conn = get_db()
        cur = conn.execute(query, args)
        rv = cur.fetchall()
        cur.close()
        if commit:
            conn.commit()
        return (rv[0] if rv else None) if one else rv
    except sqlite3.Error as e:
        logger.error(f"Database query error: {e}")
        if conn and commit:
            try:
                conn.rollback()
            except:
                pass  # If rollback fails, we can't do much
        raise
    except Exception as e:
        logger.error(f"Unexpected error in query_db: {e}")
        if conn and commit:
            try:
                conn.rollback()
            except:
                pass
        raise

# ----------------- Root and Favicon Routes -----------------
@app.route('/')
def index():
    return jsonify({"message": "Welcome to Kadh.ai API"}), 200

@app.route('/favicon.ico')
def favicon():
    return '', 204

# ----------------- User Signup -----------------
@app.route('/signup', methods=['POST'])
def signup():
    logger.info("Signup request received")
    data = request.get_json()
    logger.info(f"Signup data: {data}")
    
    if not data or 'username' not in data or 'password' not in data or 'email' not in data:
        logger.error("Missing required fields in signup request")
        return jsonify({'error': 'Username, email, and password are required'}), 400
    
    username = data['username']
    password = data['password']
    email = data['email']
    
    try:
        # Check if user already exists
        existing_user = query_db('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], one=True)
        if existing_user:
            logger.warning(f"Username {username} or email {email} already exists")
            return jsonify({'error': 'Username or email already exists'}), 400
        
        # Insert new user
        logger.info(f"Attempting to insert new user: {username}")
        query_db(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password],
            commit=True
        )
        logger.info(f"Successfully created user: {username}")
        
        # Get the newly created user's ID
        user = query_db('SELECT id, username FROM users WHERE username = ?', [username], one=True)
        
        return jsonify({
            'message': 'User created successfully',
            'user_id': user['id'],
            'username': user['username']
        }), 201
        
    except sqlite3.Error as e:
        logger.error(f"Database error during signup: {e}")
        return jsonify({'error': 'Database error occurred'}), 500
    except Exception as e:
        logger.error(f"Unexpected error during signup: {e}")
        return jsonify({'error': 'An unexpected error occurred'}), 500

# ----------------- User Login -----------------
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        logger.info("Login attempt received")
        
        if not data:
            logger.error("No data provided in login request")
            return jsonify({"error": "No data provided"}), 400

        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            logger.error("Missing username or password")
            return jsonify({"error": "Username and password are required"}), 400

        # First check if user exists
        user = query_db("SELECT * FROM users WHERE username = ?", [username], one=True)
        
        if not user:
            logger.warning(f"Login attempt failed: User {username} not found")
            return jsonify({"error": "Invalid username or password"}), 401

        # Then check password
        if user['password'] != password:
            logger.warning(f"Login attempt failed: Invalid password for user {username}")
            return jsonify({"error": "Invalid username or password"}), 401

        logger.info(f"Successful login for user: {username}")
        return jsonify({
            "message": "Login successful",
            "user_id": user["id"],
            "username": user["username"]
        }), 200

    except sqlite3.Error as e:
        logger.error(f"Database error during login: {str(e)}")
        return jsonify({"error": "Database error occurred"}), 500
    except Exception as e:
        logger.error(f"Unexpected error during login: {str(e)}")
        return jsonify({"error": "An unexpected error occurred"}), 500

# ----------------- Add Favorite -----------------
@app.route('/favorites', methods=['POST'])
def add_favorite():
    try:
        data = request.json
        if not data:
            return jsonify({"message": "No data provided"}), 400
            
        user_id = data.get('user_id')
        recipe_id = data.get('recipe_id')
        
        if not user_id or not recipe_id:
            return jsonify({"message": "User ID and Recipe ID are required"}), 400
            
        db = get_db()
        db.execute("INSERT INTO favorites (user_id, recipe_id) VALUES (?, ?)", [user_id, recipe_id])
        db.commit()
        return jsonify({"message": "Favorite added"}), 201
    except sqlite3.Error as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

# ----------------- Remove Favorite -----------------
@app.route('/favorites', methods=['DELETE'])
def remove_favorite():
    try:
        data = request.json
        if not data:
            return jsonify({"message": "No data provided"}), 400
            
        user_id = data.get('user_id')
        recipe_id = data.get('recipe_id')
        
        if not user_id or not recipe_id:
            return jsonify({"message": "User ID and Recipe ID are required"}), 400
            
        db = get_db()
        db.execute("DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?", [user_id, recipe_id])
        db.commit()
        return jsonify({"message": "Favorite removed"}), 200
    except sqlite3.Error as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

# ----------------- Get Favorites -----------------
@app.route('/favorites/<int:user_id>', methods=['GET'])
def get_favorites(user_id):
    try:
        # First check if user exists
        user = query_db("SELECT id FROM users WHERE id = ?", [user_id], one=True)
        if not user:
            logger.warning(f"Get favorites failed: User {user_id} not found")
            return jsonify({"error": "User not found"}), 404

        # Get favorites with detailed recipe information
        rows = query_db("""
            SELECT 
                r.id,
                r.title,
                r.description,
                r.category,
                r.cuisine,
                r.prep_time,
                r.cook_time,
                r.difficulty,
                r.image_url,
                r.ingredients,
                r.instructions,
                r.tags,
                r.allergens
            FROM recipes r
            JOIN favorites f ON r.id = f.recipe_id
            WHERE f.user_id = ?
            ORDER BY r.title
        """, [user_id])

        if not rows:
            return jsonify([]), 200  # Return empty array if no favorites

        # Convert rows to list of dictionaries with proper JSON serialization
        favorites = []
        for row in rows:
            recipe = dict(row)
            favorites.append(recipe)

        logger.info(f"Successfully retrieved {len(favorites)} favorites for user {user_id}")
        return jsonify(favorites), 200

    except sqlite3.Error as e:
        logger.error(f"Database error in get_favorites: {str(e)}")
        return jsonify({"error": "Failed to retrieve favorites"}), 500
    except Exception as e:
        logger.error(f"Unexpected error in get_favorites: {str(e)}")
        return jsonify({"error": "An unexpected error occurred"}), 500

# ----------------- Add Review -----------------
@app.route('/review', methods=['POST'])
def add_review():
    try:
        data = request.json
        if not data:
            return jsonify({"message": "No data provided"}), 400
            
        user_id = data.get('user_id')
        recipe_id = data.get('recipe_id')
        review = data.get('review')
        rating = data.get('rating')
        
        if not user_id or not recipe_id or not review:
            return jsonify({"message": "User ID, Recipe ID and review text are required"}), 400
            
        db = get_db()
        db.execute("INSERT INTO reviews (user_id, recipe_id, review, rating) VALUES (?, ?, ?, ?)", 
                   [user_id, recipe_id, review, rating])
        db.commit()
        return jsonify({"message": "Review added"}), 201
    except sqlite3.Error as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

# ----------------- Get Reviews -----------------
@app.route('/reviews/<int:recipe_id>', methods=['GET'])
def get_reviews(recipe_id):
    try:
        rows = query_db("""
            SELECT u.username, r.review, r.rating FROM reviews r
            JOIN users u ON r.user_id = u.id
            WHERE r.recipe_id = ?
        """, [recipe_id])
        return jsonify(rows), 200
    except sqlite3.Error as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

# ----------------- Recommendations -----------------
@app.route('/recommend/<int:user_id>', methods=['GET'])
def recommend(user_id):
    try:
        favs = query_db("SELECT recipe_id FROM favorites WHERE user_id = ?", [user_id])
        if not favs:
            # If user has no favorites, return some random recipes
            recs = query_db("SELECT * FROM recipes LIMIT 5")
            return jsonify(recs), 200
            
        fav_ids = [f['recipe_id'] for f in favs]
        
        placeholders = ','.join(['?'] * len(fav_ids))
        recs = query_db(f"SELECT * FROM recipes WHERE id NOT IN ({placeholders}) LIMIT 5", fav_ids)
        return jsonify(recs), 200
    except sqlite3.Error as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

# ----------------- Get Safe Recipes -----------------
@app.route('/recipes/safe/<int:user_id>', methods=['GET'])
def get_safe_recipes(user_id):
    try:
        # Return all recipes since we don't track user allergens anymore
        all_recipes = query_db("SELECT * FROM recipes")
        return jsonify(all_recipes), 200
    except sqlite3.Error as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

# ----------------- Add Recipe with Allergens -----------------
@app.route('/recipes', methods=['POST'])
def add_recipe():
    try:
        data = request.json
        if not data:
            return jsonify({"message": "No data provided"}), 400
            
        # Required fields
        title = data.get('title')
        cuisine = data.get('cuisine')
        ingredients = data.get('ingredients')
        instructions = data.get('instructions')
        
        # Optional fields
        tags = data.get('tags', '')
        allergens = data.get('allergens', '')
        
        # Validate required fields
        if not title or not cuisine or not ingredients or not instructions:
            return jsonify({
                "message": "Missing required fields",
                "required": ["title", "cuisine", "ingredients", "instructions"]
            }), 400
            
        db = get_db()
        cursor = db.cursor()
        cursor.execute("""
            INSERT INTO recipes (title, cuisine, ingredients, instructions, tags, allergens)
            VALUES (?, ?, ?, ?, ?, ?)
        """, [title, cuisine, ingredients, instructions, tags, allergens])
        db.commit()
        
        # Get the ID of the inserted recipe
        recipe_id = cursor.lastrowid
        
        return jsonify({
            "message": "Recipe added successfully",
            "recipe_id": recipe_id
        }), 201
    except sqlite3.Error as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

# ----------------- Get All Recipes -----------------
@app.route('/recipes', methods=['GET'])
def get_all_recipes():
    try:
        recipes = query_db("SELECT * FROM recipes")
        return jsonify(recipes), 200
    except sqlite3.Error as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

# ----------------- Get Recipe by ID -----------------
@app.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    try:
        recipe = query_db("SELECT * FROM recipes WHERE id = ?", [recipe_id], one=True)
        if not recipe:
            return jsonify({"message": "Recipe not found"}), 404
            
        return jsonify(recipe), 200
    except sqlite3.Error as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

# ----------------- Recipe Search -----------------
@app.route('/api/recipes/search', methods=['GET'])
def search_recipes():
    try:
        # Get search parameters
        search_query = request.args.get('q', '').lower()
        categories = request.args.get('categories', '').split(',')
        categories = [cat for cat in categories if cat]  # Remove empty strings
        
        # Base query
        query = """
            SELECT id, title, description, category, prep_time, cook_time, 
                   difficulty, image_url, cuisine
            FROM recipes
            WHERE 1=1
        """
        params = []
        
        # Add category filter if categories are specified
        if categories:
            query += " AND category IN ({})".format(','.join('?' * len(categories)))
            params.extend(categories)
        
        # Add search term filter if query is specified
        if search_query:
            query += """ AND (
                LOWER(title) LIKE ? OR
                LOWER(description) LIKE ? OR
                LOWER(ingredients) LIKE ? OR
                LOWER(instructions) LIKE ?
            )"""
            search_pattern = f"%{search_query}%"
            params.extend([search_pattern] * 4)
        
        # Execute query
        rows = query_db(query, params)
        
        # Convert rows to list of dictionaries
        results = []
        for row in rows:
            recipe_dict = dict(row)
            results.append(recipe_dict)
        
        return jsonify(results), 200
        
    except sqlite3.Error as e:
        logger.error(f"Database error during recipe search: {e}")
        return jsonify({"error": "Database error occurred"}), 500
    except Exception as e:
        logger.error(f"Unexpected error during recipe search: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

# ----------------- Category Favorites -----------------
@app.route('/category_favorites', methods=['POST'])
def add_category_favorite():
    try:
        data = request.json
        if not data:
            return jsonify({"message": "No data provided"}), 400
            
        user_id = data.get('user_id')
        category = data.get('category')
        
        if not user_id or not category:
            return jsonify({"message": "User ID and category are required"}), 400
            
        # Check if already favorited
        existing = query_db(
            "SELECT id FROM category_favorites WHERE user_id = ? AND category = ?",
            [user_id, category],
            one=True
        )
        
        if existing:
            return jsonify({"message": "Category already favorited"}), 400
            
        db = get_db()
        db.execute(
            "INSERT INTO category_favorites (user_id, category) VALUES (?, ?)",
            [user_id, category]
        )
        db.commit()
        return jsonify({"message": "Category favorite added"}), 201
        
    except sqlite3.Error as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

@app.route('/category_favorites/<int:user_id>', methods=['GET'])
def get_category_favorites(user_id):
    try:
        favorites = query_db(
            "SELECT category FROM category_favorites WHERE user_id = ?",
            [user_id]
        )
        return jsonify([fav['category'] for fav in favorites]), 200
    except sqlite3.Error as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

@app.route('/category_favorites', methods=['DELETE'])
def remove_category_favorite():
    try:
        data = request.json
        if not data:
            return jsonify({"message": "No data provided"}), 400
            
        user_id = data.get('user_id')
        category = data.get('category')
        
        if not user_id or not category:
            return jsonify({"message": "User ID and category are required"}), 400
            
        db = get_db()
        db.execute(
            "DELETE FROM category_favorites WHERE user_id = ? AND category = ?",
            [user_id, category]
        )
        db.commit()
        return jsonify({"message": "Category favorite removed"}), 200
        
    except sqlite3.Error as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

# ----------------- Get Random Recipe -----------------
@app.route('/random_recipe', methods=['GET'])
def get_random_recipe():
    try:
        recipe = query_db("SELECT * FROM recipes ORDER BY RANDOM() LIMIT 1", one=True)
        if not recipe:
            return jsonify({"message": "No recipes available"}), 404
            
        return jsonify(recipe), 200
    except sqlite3.Error as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

# Clean up function to be called on exit
def cleanup():
    logger.info("Performing application cleanup...")
    # Close any open database connections
    db = getattr(g, '_database', None) if 'g' in globals() else None
    if db is not None:
        logger.info("Closing database connection during cleanup")
        db.close()
    logger.info("Cleanup completed")

# Register cleanup function
atexit.register(cleanup)

# Signal handler for graceful shutdown
def signal_handler(sig, frame):
    logger.info(f"Received signal {sig}, shutting down gracefully...")
    cleanup()
    sys.exit(0)

# Register signal handlers
signal.signal(signal.SIGINT, signal_handler)  # Handles Ctrl+C
if hasattr(signal, 'SIGTERM'):
    signal.signal(signal.SIGTERM, signal_handler)  # Handles termination signal

if __name__ == '__main__':
    try:
        logger.info("Starting Kadh.ai Flask application...")
        
        # Check if database exists, warn if not
        if not os.path.exists(DATABASE):
            logger.warning(f"Database file {DATABASE} not found. Please run init_db.py first.")
        
        # Start the Flask application
        app.run(debug=True, host='0.0.0.0', port=5000)
    except KeyboardInterrupt:
        logger.info("Keyboard interrupt received, shutting down...")
    except Exception as e:
        logger.error(f"Error starting application: {str(e)}")
    finally:
        logger.info("Application shutdown complete")
