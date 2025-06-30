import sqlite3
import os
import json
from datetime import datetime

# Get the absolute path to the database
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE = os.path.join(BASE_DIR, 'kadhai.db')

def add_recipes():
    # Sample recipes data with all required fields
    recipes_data = {
        "Seafood": [
            {
                "title": "Grilled Salmon with Lemon",
                "description": "Fresh salmon fillets grilled to perfection with lemon and herbs",
                "category": "Seafood",
                "cuisine": "Mediterranean",
                "prep_time": "15 mins",
                "cook_time": "20 mins",
                "difficulty": "Easy",
                "ingredients": json.dumps([
                    "4 salmon fillets",
                    "2 lemons",
                    "4 tbsp olive oil",
                    "4 cloves garlic, minced",
                    "1 tsp dried oregano",
                    "Salt and pepper to taste"
                ]),
                "instructions": json.dumps([
                    "Preheat grill to medium-high heat",
                    "Mix olive oil, garlic, and oregano",
                    "Season salmon with salt and pepper",
                    "Brush with oil mixture",
                    "Grill for 5-6 minutes per side",
                    "Serve with lemon wedges"
                ]),
                "image_url": "https://example.com/salmon.jpg",
                "tags": "healthy,grilled,fish",
                "allergens": "fish"
            },
            {
                "title": "Shrimp Scampi",
                "description": "Garlicky shrimp in white wine butter sauce",
                "category": "Seafood",
                "cuisine": "Italian",
                "prep_time": "10 mins",
                "cook_time": "15 mins",
                "difficulty": "Easy",
                "ingredients": json.dumps([
                    "1 lb large shrimp",
                    "6 cloves garlic",
                    "1/2 cup white wine",
                    "1/4 cup butter",
                    "1/4 cup olive oil",
                    "Red pepper flakes",
                    "Parsley",
                    "Salt and pepper"
                ]),
                "instructions": json.dumps([
                    "Clean and devein shrimp",
                    "Sauté garlic in butter and oil",
                    "Add shrimp and cook until pink",
                    "Add wine and simmer",
                    "Season and garnish with parsley"
                ]),
                "image_url": "https://example.com/scampi.jpg",
                "tags": "italian,shrimp,garlic",
                "allergens": "shellfish,dairy"
            },
            {
                "title": "Fish and Chips",
                "description": "Classic British beer-battered fish with crispy chips",
                "category": "Seafood",
                "cuisine": "British",
                "prep_time": "20 mins",
                "cook_time": "30 mins",
                "difficulty": "Medium",
                "ingredients": json.dumps([
                    "4 cod fillets",
                    "2 cups flour",
                    "1 bottle beer",
                    "4 large potatoes",
                    "Oil for frying",
                    "Salt and vinegar"
                ]),
                "instructions": json.dumps([
                    "Cut potatoes into chips",
                    "Make beer batter",
                    "Fry chips until golden",
                    "Dip fish in batter",
                    "Fry until crispy",
                    "Serve with malt vinegar"
                ]),
                "image_url": "https://example.com/fishandchips.jpg",
                "tags": "british,fried,classic",
                "allergens": "fish,gluten"
            },
            {
                "title": "Seafood Paella",
                "description": "Spanish rice dish with mixed seafood and saffron",
                "category": "Seafood",
                "cuisine": "Spanish",
                "prep_time": "30 mins",
                "cook_time": "45 mins",
                "difficulty": "Hard",
                "ingredients": json.dumps([
                    "2 cups Bomba rice",
                    "Mixed seafood",
                    "Saffron threads",
                    "1 onion",
                    "4 cloves garlic",
                    "1 red pepper",
                    "Seafood stock",
                    "Peas"
                ]),
                "instructions": json.dumps([
                    "Toast rice with sofrito",
                    "Add saffron and stock",
                    "Add seafood in stages",
                    "Create socarrat",
                    "Rest and serve"
                ]),
                "image_url": "https://example.com/paella.jpg",
                "tags": "spanish,rice,seafood",
                "allergens": "shellfish,fish"
            },
            {
                "title": "Tuna Poke Bowl",
                "description": "Hawaiian-style raw tuna bowl with rice and vegetables",
                "category": "Seafood",
                "cuisine": "Hawaiian",
                "prep_time": "20 mins",
                "cook_time": "0 mins",
                "difficulty": "Easy",
                "ingredients": json.dumps([
                    "Sushi-grade tuna",
                    "Soy sauce",
                    "Sesame oil",
                    "Rice",
                    "Avocado",
                    "Cucumber",
                    "Seaweed",
                    "Sesame seeds"
                ]),
                "instructions": json.dumps([
                    "Cube tuna",
                    "Make marinade",
                    "Prepare vegetables",
                    "Cook rice",
                    "Assemble bowl",
                    "Garnish and serve"
                ]),
                "image_url": "https://example.com/poke.jpg",
                "tags": "hawaiian,raw,healthy",
                "allergens": "fish,soy"
            }
        ],
        "Chicken": [
            {
                "title": "Classic Chicken Curry",
                "description": "A rich and aromatic chicken curry with Indian spices",
                "category": "Chicken",
                "cuisine": "Indian",
                "prep_time": "20 mins",
                "cook_time": "40 mins",
                "difficulty": "Medium",
                "ingredients": json.dumps([
                    "1kg chicken pieces",
                    "2 onions, finely chopped",
                    "4 tomatoes, pureed",
                    "4 cloves garlic",
                    "2-inch ginger piece",
                    "2 tbsp curry powder",
                    "1 cup yogurt",
                    "Salt to taste"
                ]),
                "instructions": json.dumps([
                    "Marinate chicken in yogurt and spices",
                    "Heat oil and sauté onions until golden",
                    "Add ginger-garlic paste and cook",
                    "Add tomatoes and spices",
                    "Add chicken and cook until tender",
                    "Garnish with coriander"
                ]),
                "image_url": "https://example.com/curry.jpg",
                "tags": "spicy,curry,indian",
                "allergens": "dairy"
            },
            {
                "title": "Chicken Parmesan",
                "description": "Crispy breaded chicken topped with marinara and melted cheese",
                "category": "Chicken",
                "cuisine": "Italian",
                "prep_time": "25 mins",
                "cook_time": "30 mins",
                "difficulty": "Medium",
                "ingredients": json.dumps([
                    "4 chicken breasts",
                    "2 cups breadcrumbs",
                    "2 eggs",
                    "1 cup flour",
                    "Marinara sauce",
                    "Mozzarella cheese",
                    "Parmesan cheese",
                    "Italian herbs"
                ]),
                "instructions": json.dumps([
                    "Pound chicken to even thickness",
                    "Dredge in flour, egg, and breadcrumbs",
                    "Fry until golden brown",
                    "Top with sauce and cheese",
                    "Bake until cheese melts",
                    "Serve with pasta"
                ]),
                "image_url": "https://example.com/chicken_parm.jpg",
                "tags": "italian,crispy,cheese",
                "allergens": "dairy,egg,gluten"
            },
            {
                "title": "Chicken Teriyaki",
                "description": "Japanese-style chicken glazed with sweet teriyaki sauce",
                "category": "Chicken",
                "cuisine": "Japanese",
                "prep_time": "15 mins",
                "cook_time": "20 mins",
                "difficulty": "Easy",
                "ingredients": json.dumps([
                    "4 chicken thighs",
                    "1/2 cup soy sauce",
                    "1/4 cup mirin",
                    "1/4 cup sake",
                    "2 tbsp sugar",
                    "Ginger",
                    "Green onions"
                ]),
                "instructions": json.dumps([
                    "Make teriyaki sauce",
                    "Cook chicken until browned",
                    "Add sauce and glaze",
                    "Slice and serve",
                    "Garnish with green onions"
                ]),
                "image_url": "https://example.com/teriyaki.jpg",
                "tags": "japanese,sweet,glazed",
                "allergens": "soy"
            },
            {
                "title": "Chicken Fajitas",
                "description": "Sizzling Mexican-style chicken with peppers and onions",
                "category": "Chicken",
                "cuisine": "Mexican",
                "prep_time": "20 mins",
                "cook_time": "15 mins",
                "difficulty": "Easy",
                "ingredients": json.dumps([
                    "1 lb chicken breast",
                    "3 bell peppers",
                    "2 onions",
                    "Fajita seasoning",
                    "Tortillas",
                    "Lime",
                    "Guacamole",
                    "Sour cream"
                ]),
                "instructions": json.dumps([
                    "Slice chicken and vegetables",
                    "Season chicken",
                    "Cook chicken until done",
                    "Sauté vegetables",
                    "Serve with tortillas",
                    "Add toppings"
                ]),
                "image_url": "https://example.com/fajitas.jpg",
                "tags": "mexican,spicy,grilled",
                "allergens": "dairy"
            },
            {
                "title": "Chicken Satay",
                "description": "Grilled chicken skewers with peanut sauce",
                "category": "Chicken",
                "cuisine": "Thai",
                "prep_time": "30 mins",
                "cook_time": "15 mins",
                "difficulty": "Medium",
                "ingredients": json.dumps([
                    "1 lb chicken breast",
                    "Coconut milk",
                    "Curry powder",
                    "Lemongrass",
                    "Peanut butter",
                    "Soy sauce",
                    "Brown sugar",
                    "Lime"
                ]),
                "instructions": json.dumps([
                    "Marinate chicken",
                    "Thread onto skewers",
                    "Make peanut sauce",
                    "Grill until cooked",
                    "Serve with sauce"
                ]),
                "image_url": "https://example.com/satay.jpg",
                "tags": "thai,grilled,spicy",
                "allergens": "peanuts,soy"
            }
        ],
        "Beef": [
            {
                "title": "Classic Beef Burger",
                "description": "Juicy homemade beef burger with all the trimmings",
                "category": "Beef",
                "cuisine": "American",
                "prep_time": "20 mins",
                "cook_time": "15 mins",
                "difficulty": "Easy",
                "ingredients": json.dumps([
                    "500g ground beef",
                    "1 onion, finely chopped",
                    "1 egg",
                    "2 tbsp breadcrumbs",
                    "4 burger buns",
                    "Lettuce, tomato, cheese for serving"
                ]),
                "instructions": json.dumps([
                    "Mix beef with onion, egg, and breadcrumbs",
                    "Form into patties",
                    "Grill for 5-7 minutes per side",
                    "Add cheese if desired",
                    "Serve on buns with toppings"
                ]),
                "image_url": "https://example.com/burger.jpg",
                "tags": "burger,grilled,american",
                "allergens": "egg,gluten,dairy"
            },
            {
                "title": "Beef Stroganoff",
                "description": "Tender beef strips in creamy mushroom sauce",
                "category": "Beef",
                "cuisine": "Russian",
                "prep_time": "25 mins",
                "cook_time": "35 mins",
                "difficulty": "Medium",
                "ingredients": json.dumps([
                    "600g beef sirloin",
                    "300g mushrooms",
                    "1 onion",
                    "2 cups sour cream",
                    "Beef broth",
                    "Egg noodles",
                    "Butter",
                    "Paprika"
                ]),
                "instructions": json.dumps([
                    "Slice beef thinly",
                    "Sauté mushrooms and onions",
                    "Cook beef until browned",
                    "Make cream sauce",
                    "Combine and serve over noodles"
                ]),
                "image_url": "https://example.com/stroganoff.jpg",
                "tags": "russian,creamy,pasta",
                "allergens": "dairy,gluten"
            },
            {
                "title": "Beef Stir Fry",
                "description": "Quick and easy beef stir fry with vegetables",
                "category": "Beef",
                "cuisine": "Asian",
                "prep_time": "20 mins",
                "cook_time": "15 mins",
                "difficulty": "Easy",
                "ingredients": json.dumps([
                    "500g beef strips",
                    "Mixed vegetables",
                    "Soy sauce",
                    "Garlic",
                    "Ginger",
                    "Sesame oil",
                    "Rice",
                    "Green onions"
                ]),
                "instructions": json.dumps([
                    "Marinate beef",
                    "Cook rice",
                    "Stir fry vegetables",
                    "Add beef and sauce",
                    "Serve over rice"
                ]),
                "image_url": "https://example.com/stirfry.jpg",
                "tags": "asian,quick,healthy",
                "allergens": "soy"
            },
            {
                "title": "Beef Tacos",
                "description": "Spicy ground beef tacos with fresh toppings",
                "category": "Beef",
                "cuisine": "Mexican",
                "prep_time": "15 mins",
                "cook_time": "20 mins",
                "difficulty": "Easy",
                "ingredients": json.dumps([
                    "500g ground beef",
                    "Taco seasoning",
                    "Tortillas",
                    "Lettuce",
                    "Tomatoes",
                    "Cheese",
                    "Sour cream",
                    "Avocado"
                ]),
                "instructions": json.dumps([
                    "Brown beef",
                    "Add seasoning",
                    "Warm tortillas",
                    "Prepare toppings",
                    "Assemble tacos"
                ]),
                "image_url": "https://example.com/tacos.jpg",
                "tags": "mexican,spicy,easy",
                "allergens": "dairy"
            },
            {
                "title": "Beef Wellington",
                "description": "Classic beef tenderloin wrapped in puff pastry",
                "category": "Beef",
                "cuisine": "British",
                "prep_time": "45 mins",
                "cook_time": "40 mins",
                "difficulty": "Hard",
                "ingredients": json.dumps([
                    "Beef tenderloin",
                    "Puff pastry",
                    "Mushroom duxelles",
                    "Prosciutto",
                    "Egg wash",
                    "Dijon mustard",
                    "Herbs"
                ]),
                "instructions": json.dumps([
                    "Sear beef",
                    "Make mushroom duxelles",
                    "Wrap in prosciutto",
                    "Wrap in pastry",
                    "Bake until golden"
                ]),
                "image_url": "https://example.com/wellington.jpg",
                "tags": "british,elegant,special",
                "allergens": "egg,gluten"
            }
        ],
        "Pasta": [
            {
                "title": "Classic Spaghetti Carbonara",
                "description": "Traditional Italian pasta with eggs, cheese, and pancetta",
                "category": "Pasta",
                "cuisine": "Italian",
                "prep_time": "10 mins",
                "cook_time": "20 mins",
                "difficulty": "Medium",
                "ingredients": json.dumps([
                    "400g spaghetti",
                    "200g pancetta",
                    "4 large eggs",
                    "100g Pecorino Romano",
                    "100g Parmigiano-Reggiano",
                    "Black pepper"
                ]),
                "instructions": json.dumps([
                    "Cook pasta in salted water",
                    "Fry pancetta until crispy",
                    "Mix eggs and cheese",
                    "Combine hot pasta with egg mixture",
                    "Add pancetta and pepper",
                    "Serve immediately"
                ]),
                "image_url": "https://example.com/carbonara.jpg",
                "tags": "pasta,italian,creamy",
                "allergens": "egg,dairy,gluten"
            },
            {
                "title": "Fettuccine Alfredo",
                "description": "Creamy pasta with parmesan sauce",
                "category": "Pasta",
                "cuisine": "Italian",
                "prep_time": "10 mins",
                "cook_time": "20 mins",
                "difficulty": "Easy",
                "ingredients": json.dumps([
                    "400g fettuccine",
                    "2 cups heavy cream",
                    "1 cup Parmesan cheese",
                    "4 tbsp butter",
                    "Garlic",
                    "Nutmeg",
                    "Salt and pepper"
                ]),
                "instructions": json.dumps([
                    "Cook pasta",
                    "Heat cream and butter",
                    "Add cheese and seasonings",
                    "Toss with pasta",
                    "Serve with extra cheese"
                ]),
                "image_url": "https://example.com/alfredo.jpg",
                "tags": "pasta,creamy,italian",
                "allergens": "dairy,gluten"
            },
            {
                "title": "Penne Arrabbiata",
                "description": "Spicy tomato sauce with penne pasta",
                "category": "Pasta",
                "cuisine": "Italian",
                "prep_time": "10 mins",
                "cook_time": "25 mins",
                "difficulty": "Easy",
                "ingredients": json.dumps([
                    "400g penne",
                    "2 cans tomatoes",
                    "4 cloves garlic",
                    "Red chili flakes",
                    "Olive oil",
                    "Fresh basil",
                    "Parmesan"
                ]),
                "instructions": json.dumps([
                    "Cook pasta",
                    "Sauté garlic and chili",
                    "Add tomatoes and simmer",
                    "Toss with pasta",
                    "Add fresh basil"
                ]),
                "image_url": "https://example.com/arrabbiata.jpg",
                "tags": "pasta,spicy,italian",
                "allergens": "gluten"
            },
            {
                "title": "Seafood Linguine",
                "description": "Mixed seafood pasta in white wine sauce",
                "category": "Pasta",
                "cuisine": "Italian",
                "prep_time": "20 mins",
                "cook_time": "25 mins",
                "difficulty": "Medium",
                "ingredients": json.dumps([
                    "400g linguine",
                    "Mixed seafood",
                    "White wine",
                    "Garlic",
                    "Cherry tomatoes",
                    "Parsley",
                    "Olive oil",
                    "Chili flakes"
                ]),
                "instructions": json.dumps([
                    "Cook pasta",
                    "Sauté garlic",
                    "Add seafood and wine",
                    "Toss with pasta",
                    "Garnish with parsley"
                ]),
                "image_url": "https://example.com/seafood_pasta.jpg",
                "tags": "pasta,seafood,italian",
                "allergens": "shellfish,fish,gluten"
            },
            {
                "title": "Pesto Pasta",
                "description": "Fresh basil pesto with pasta and pine nuts",
                "category": "Pasta",
                "cuisine": "Italian",
                "prep_time": "15 mins",
                "cook_time": "15 mins",
                "difficulty": "Easy",
                "ingredients": json.dumps([
                    "400g pasta",
                    "2 cups fresh basil",
                    "1/2 cup pine nuts",
                    "2 cloves garlic",
                    "1/2 cup olive oil",
                    "1/2 cup Parmesan",
                    "Salt and pepper"
                ]),
                "instructions": json.dumps([
                    "Make fresh pesto",
                    "Cook pasta",
                    "Toss with pesto",
                    "Add extra cheese",
                    "Garnish with basil"
                ]),
                "image_url": "https://example.com/pesto.jpg",
                "tags": "pasta,pesto,italian",
                "allergens": "nuts,dairy,gluten"
            }
        ],
        "Pork": [
            {
                "title": "Honey Glazed Pork Chops",
                "description": "Tender pork chops with a sweet and savory honey glaze",
                "category": "Pork",
                "cuisine": "American",
                "prep_time": "10 mins",
                "cook_time": "25 mins",
                "difficulty": "Easy",
                "ingredients": json.dumps([
                    "4 pork chops",
                    "4 tbsp honey",
                    "2 tbsp soy sauce",
                    "2 cloves garlic",
                    "Salt and pepper",
                    "1 tbsp olive oil"
                ]),
                "instructions": json.dumps([
                    "Season pork chops",
                    "Mix honey, soy sauce, and garlic",
                    "Heat oil in pan",
                    "Cook pork chops 5-6 mins per side",
                    "Brush with glaze",
                    "Rest before serving"
                ]),
                "image_url": "https://example.com/porkchops.jpg",
                "tags": "pork,glazed,sweet",
                "allergens": "soy"
            },
            {
                "title": "Pulled Pork",
                "description": "Slow-cooked BBQ pulled pork for sandwiches",
                "category": "Pork",
                "cuisine": "American",
                "prep_time": "20 mins",
                "cook_time": "8 hours",
                "difficulty": "Medium",
                "ingredients": json.dumps([
                    "2kg pork shoulder",
                    "BBQ sauce",
                    "Brown sugar",
                    "Paprika",
                    "Garlic powder",
                    "Onion powder",
                    "Burger buns",
                    "Coleslaw"
                ]),
                "instructions": json.dumps([
                    "Rub pork with spices",
                    "Slow cook for 8 hours",
                    "Shred with forks",
                    "Mix with BBQ sauce",
                    "Serve on buns with coleslaw"
                ]),
                "image_url": "https://example.com/pulled_pork.jpg",
                "tags": "bbq,slow-cooked,sandwich",
                "allergens": "gluten"
            },
            {
                "title": "Sweet and Sour Pork",
                "description": "Chinese-style crispy pork in sweet and sour sauce",
                "category": "Pork",
                "cuisine": "Chinese",
                "prep_time": "30 mins",
                "cook_time": "20 mins",
                "difficulty": "Medium",
                "ingredients": json.dumps([
                    "500g pork belly",
                    "Bell peppers",
                    "Pineapple",
                    "Rice vinegar",
                    "Ketchup",
                    "Sugar",
                    "Soy sauce",
                    "Cornstarch"
                ]),
                "instructions": json.dumps([
                    "Cut pork into cubes",
                    "Make sweet and sour sauce",
                    "Fry pork until crispy",
                    "Stir fry vegetables",
                    "Combine with sauce"
                ]),
                "image_url": "https://example.com/sweet_sour.jpg",
                "tags": "chinese,sweet,crispy",
                "allergens": "soy"
            },
            {
                "title": "Pork Schnitzel",
                "description": "German-style breaded pork cutlets",
                "category": "Pork",
                "cuisine": "German",
                "prep_time": "20 mins",
                "cook_time": "15 mins",
                "difficulty": "Medium",
                "ingredients": json.dumps([
                    "4 pork cutlets",
                    "2 eggs",
                    "Breadcrumbs",
                    "Flour",
                    "Lemon",
                    "Parsley",
                    "Oil for frying"
                ]),
                "instructions": json.dumps([
                    "Pound cutlets thin",
                    "Dredge in flour",
                    "Dip in egg",
                    "Coat in breadcrumbs",
                    "Fry until golden"
                ]),
                "image_url": "https://example.com/schnitzel.jpg",
                "tags": "german,crispy,fried",
                "allergens": "egg,gluten"
            },
            {
                "title": "Pork Dumplings",
                "description": "Asian-style dumplings with pork filling",
                "category": "Pork",
                "cuisine": "Asian",
                "prep_time": "45 mins",
                "cook_time": "15 mins",
                "difficulty": "Hard",
                "ingredients": json.dumps([
                    "Ground pork",
                    "Dumpling wrappers",
                    "Cabbage",
                    "Green onions",
                    "Ginger",
                    "Garlic",
                    "Soy sauce",
                    "Sesame oil"
                ]),
                "instructions": json.dumps([
                    "Mix filling ingredients",
                    "Fill and fold dumplings",
                    "Steam or fry",
                    "Make dipping sauce",
                    "Serve hot"
                ]),
                "image_url": "https://example.com/dumplings.jpg",
                "tags": "asian,dumplings,steamed",
                "allergens": "soy,gluten"
            }
        ],
        "Vegetarian": [
            {
                "title": "Mushroom Risotto",
                "description": "Creamy Italian risotto with mixed mushrooms",
                "category": "Vegetarian",
                "cuisine": "Italian",
                "prep_time": "15 mins",
                "cook_time": "30 mins",
                "difficulty": "Medium",
                "ingredients": json.dumps([
                    "300g Arborio rice",
                    "400g mixed mushrooms",
                    "1 onion",
                    "2 cloves garlic",
                    "1L vegetable stock",
                    "100g Parmesan",
                    "White wine"
                ]),
                "instructions": json.dumps([
                    "Sauté mushrooms and set aside",
                    "Cook onion and garlic",
                    "Add rice and wine",
                    "Add stock gradually",
                    "Stir until creamy",
                    "Add mushrooms and cheese"
                ]),
                "image_url": "https://example.com/risotto.jpg",
                "tags": "vegetarian,italian,creamy",
                "allergens": "dairy"
            },
            {
                "title": "Vegetable Curry",
                "description": "Spicy Indian curry with mixed vegetables",
                "category": "Vegetarian",
                "cuisine": "Indian",
                "prep_time": "20 mins",
                "cook_time": "35 mins",
                "difficulty": "Medium",
                "ingredients": json.dumps([
                    "Mixed vegetables",
                    "Coconut milk",
                    "Curry powder",
                    "Onion",
                    "Garlic",
                    "Ginger",
                    "Tomatoes",
                    "Rice"
                ]),
                "instructions": json.dumps([
                    "Chop vegetables",
                    "Sauté aromatics",
                    "Add spices and coconut milk",
                    "Simmer vegetables",
                    "Serve with rice"
                ]),
                "image_url": "https://example.com/veg_curry.jpg",
                "tags": "indian,spicy,curry",
                "allergens": ""
            },
            {
                "title": "Quinoa Buddha Bowl",
                "description": "Healthy bowl with quinoa and roasted vegetables",
                "category": "Vegetarian",
                "cuisine": "International",
                "prep_time": "15 mins",
                "cook_time": "25 mins",
                "difficulty": "Easy",
                "ingredients": json.dumps([
                    "Quinoa",
                    "Sweet potato",
                    "Chickpeas",
                    "Kale",
                    "Avocado",
                    "Tahini",
                    "Lemon",
                    "Seeds"
                ]),
                "instructions": json.dumps([
                    "Cook quinoa",
                    "Roast vegetables",
                    "Make tahini dressing",
                    "Assemble bowl",
                    "Top with seeds"
                ]),
                "image_url": "https://example.com/buddha_bowl.jpg",
                "tags": "healthy,bowl,roasted",
                "allergens": "sesame"
            },
            {
                "title": "Vegetable Lasagna",
                "description": "Layered pasta with vegetables and cheese",
                "category": "Vegetarian",
                "cuisine": "Italian",
                "prep_time": "30 mins",
                "cook_time": "45 mins",
                "difficulty": "Medium",
                "ingredients": json.dumps([
                    "Lasagna noodles",
                    "Spinach",
                    "Ricotta cheese",
                    "Mozzarella",
                    "Marinara sauce",
                    "Zucchini",
                    "Mushrooms",
                    "Herbs"
                ]),
                "instructions": json.dumps([
                    "Prepare vegetables",
                    "Make cheese mixture",
                    "Layer ingredients",
                    "Bake until bubbly",
                    "Rest before serving"
                ]),
                "image_url": "https://example.com/veg_lasagna.jpg",
                "tags": "italian,pasta,baked",
                "allergens": "dairy,gluten"
            },
            {
                "title": "Falafel Wrap",
                "description": "Middle Eastern chickpea patties in flatbread",
                "category": "Vegetarian",
                "cuisine": "Middle Eastern",
                "prep_time": "20 mins",
                "cook_time": "15 mins",
                "difficulty": "Medium",
                "ingredients": json.dumps([
                    "Chickpeas",
                    "Fresh herbs",
                    "Garlic",
                    "Cumin",
                    "Flatbread",
                    "Tahini sauce",
                    "Lettuce",
                    "Tomatoes"
                ]),
                "instructions": json.dumps([
                    "Blend falafel mixture",
                    "Form into balls",
                    "Fry until crispy",
                    "Make tahini sauce",
                    "Assemble wraps"
                ]),
                "image_url": "https://example.com/falafel.jpg",
                "tags": "middle-eastern,wrap,fried",
                "allergens": "sesame,gluten"
            }
        ]
    }

    try:
        # Connect to the database
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        # Insert recipes for each category
        for category, recipes in recipes_data.items():
            for recipe in recipes:
                cursor.execute("""
                    INSERT INTO recipes (
                        title, description, category, cuisine,
                        prep_time, cook_time, difficulty,
                        ingredients, instructions, image_url,
                        tags, allergens
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, [
                    recipe['title'],
                    recipe['description'],
                    recipe['category'],
                    recipe['cuisine'],
                    recipe['prep_time'],
                    recipe['cook_time'],
                    recipe['difficulty'],
                    recipe['ingredients'],
                    recipe['instructions'],
                    recipe['image_url'],
                    recipe['tags'],
                    recipe['allergens']
                ])

        # Commit the changes
        conn.commit()
        print("Sample recipes added successfully!")

    except sqlite3.Error as e:
        print(f"Database error: {e}")
        if conn:
            conn.rollback()
        raise
    except Exception as e:
        print(f"Error: {e}")
        if conn:
            conn.rollback()
        raise
    finally:
        if conn:
            conn.close()

if __name__ == '__main__':
    add_recipes() 