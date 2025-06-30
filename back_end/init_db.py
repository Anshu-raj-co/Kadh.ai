import sqlite3
import os
import json
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Get the absolute path to the database
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE = os.path.join(BASE_DIR, 'kadhai.db')
SCHEMA_FILE = os.path.join(BASE_DIR, 'schema.sql')

def check_tables_exist():
    """Check if the required tables exist in the database."""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = {table[0] for table in cursor.fetchall()}
        required_tables = {'users', 'recipes', 'favorites', 'reviews'}
        return required_tables.issubset(tables)
    except Exception as e:
        logger.error(f"Error checking tables: {e}")
        return False
    finally:
        if conn:
            conn.close()

def create_schema():
    """Create the database schema if it doesn't exist."""
    try:
        conn = sqlite3.connect(DATABASE)
        with open(SCHEMA_FILE, 'r') as f:
            schema_sql = f.read()
            conn.executescript(schema_sql)
        logger.info("Schema created successfully!")
    finally:
        if conn:
            conn.close()

def clear_recipes():
    """Clear existing recipes from the database."""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute("DELETE FROM recipes")
        conn.commit()
        logger.info("Cleared existing recipes")
    except sqlite3.Error as e:
        logger.error(f"Error clearing recipes: {e}")
        raise
    finally:
        if conn:
            conn.close()

def run_migrations():
    """Run all necessary database migrations."""
    try:
        logger.info("Running database migrations...")
        from migrate_db import migrate_database
        migrate_database()  # Run recipes migration
        logger.info("All migrations completed successfully!")
    except Exception as e:
        logger.error(f"Error during migrations: {e}")
        raise

def init_database():
    """Initialize the database with schema and sample data."""
    try:
        logger.info(f"Initializing database at: {DATABASE}")
        
        # Check if tables exist, create them if they don't
        if not check_tables_exist():
            logger.info("Creating database schema...")
            create_schema()
        
        # Run any necessary migrations
        run_migrations()
        
        # Clear existing recipes and add new ones
        logger.info("Clearing existing recipes...")
        clear_recipes()
        
        # Import and run the add_sample_recipes function
        logger.info("Adding sample recipes...")
        from add_sample_recipes import add_recipes
        add_recipes()
        
        logger.info("Database initialization completed successfully!")
        
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        raise

if __name__ == '__main__':
    try:
        init_database()
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
        exit(1)
