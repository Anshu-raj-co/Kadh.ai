import sqlite3
import sys

def migrate_database():
    print("Starting migration to add allergens column to recipes table...")
    
    # Connect to the database
    try:
        conn = sqlite3.connect('kadhai.db')
        cursor = conn.cursor()
        
        # Check if the allergens column already exists
        cursor.execute("PRAGMA table_info(recipes)")
        columns = cursor.fetchall()
        column_names = [column[1] for column in columns]
        
        if 'allergens' in column_names:
            print("The allergens column already exists in the recipes table. No migration needed.")
            conn.close()
            return
        
        # Add the allergens column to the recipes table
        print("Adding allergens column to recipes table...")
        cursor.execute("ALTER TABLE recipes ADD COLUMN allergens TEXT DEFAULT ''")
        
        # Commit the changes
        conn.commit()
        print("Migration completed successfully!")
        
    except sqlite3.Error as e:
        print(f"An error occurred during migration: {e}")
        if conn:
            conn.rollback()
        sys.exit(1)
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    migrate_database()

