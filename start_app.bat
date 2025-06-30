@echo off
echo Starting Kadh.ai Recipe Application...

echo Step 1: Installing required packages...
pip install flask

 echo Step 2: Initializing database...
python back_end/init_db.py

echo Step 3: Adding sample recipes...
python back_end/add_sample_recipes.py

echo Step 4: Starting the server...
start python back_end/app.py

echo Step 5: Opening the application in your browser...
start front_end/HTML/login.html

echo Application started successfully!
echo You can now:
echo 1. Sign up for a new account
echo 2. Log in with your credentials
echo 3. Set your allergens
echo 4. Browse safe recipes
echo 5. Add recipes to favorites

echo Press any key to exit...
pause > nul 