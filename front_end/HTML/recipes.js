const recipes = {
    'Seafood': [
        {
            title: 'Grilled Salmon with Lemon Butter',
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
            description: 'Perfectly grilled salmon with a rich lemon butter sauce',
            recipe: '1. Season salmon fillets with salt and pepper\n2. Grill for 4-5 minutes per side\n3. Prepare lemon butter sauce: melt butter, add lemon juice and herbs\n4. Drizzle sauce over salmon and serve with roasted vegetables',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Shrimp Scampi Pasta',
            image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
            description: 'Classic shrimp scampi with linguine and white wine sauce',
            recipe: '1. Cook linguine according to package instructions\n2. Sauté garlic in butter and olive oil\n3. Add shrimp and cook until pink\n4. Deglaze with white wine and lemon juice\n5. Toss with pasta and fresh parsley',
            prepTime: '20 mins',
            cookTime: '20 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Crispy Fish Tacos',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Crispy battered fish in soft tortillas with fresh slaw',
            recipe: '1. Prepare beer batter and coat fish fillets\n2. Deep fry until golden brown\n3. Assemble tacos with cabbage slaw and avocado\n4. Top with lime crema and fresh cilantro',
            prepTime: '25 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Lobster Thermidor',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Classic French lobster dish with creamy sauce',
            recipe: '1. Cook lobster and remove meat\n2. Prepare béchamel sauce with mustard and cheese\n3. Mix lobster meat with sauce\n4. Stuff shells and broil until golden',
            prepTime: '30 mins',
            cookTime: '20 mins',
            difficulty: 'Hard'
        },
        {
            title: 'Seafood Paella',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spanish rice dish with mixed seafood',
            recipe: '1. Sauté onions, garlic, and bell peppers\n2. Add rice and saffron\n3. Add seafood and cook until done\n4. Garnish with lemon wedges',
            prepTime: '30 mins',
            cookTime: '30 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Grilled Octopus',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Tender grilled octopus with Mediterranean flavors',
            recipe: '1. Boil octopus until tender\n2. Marinate in olive oil and herbs\n3. Grill until charred\n4. Serve with lemon and herbs',
            prepTime: '20 mins',
            cookTime: '45 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Crab Cakes',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Crispy crab cakes with remoulade sauce',
            recipe: '1. Mix crab meat with breadcrumbs and seasonings\n2. Form into patties\n3. Pan fry until golden\n4. Serve with remoulade sauce',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Mussels in White Wine',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Steamed mussels in garlic white wine sauce',
            recipe: '1. Sauté garlic and shallots\n2. Add white wine and bring to boil\n3. Add mussels and steam until open\n4. Garnish with parsley',
            prepTime: '15 mins',
            cookTime: '10 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Tuna Poke Bowl',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Hawaiian raw tuna salad bowl',
            recipe: '1. Marinate tuna in soy sauce and sesame oil\n2. Prepare rice and vegetables\n3. Assemble bowl with toppings\n4. Drizzle with sauce',
            prepTime: '20 mins',
            cookTime: '0 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Seafood Chowder',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy soup with mixed seafood',
            recipe: '1. Cook vegetables in butter\n2. Add flour and stock\n3. Add seafood and cream\n4. Simmer until seafood is cooked',
            prepTime: '20 mins',
            cookTime: '30 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Grilled Swordfish',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Grilled swordfish with herb marinade',
            recipe: '1. Marinate swordfish in herbs and oil\n2. Grill until cooked through\n3. Serve with lemon and herbs',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Seafood Risotto',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy risotto with mixed seafood',
            recipe: '1. Cook onions and rice\n2. Add wine and stock gradually\n3. Add seafood and cook until done\n4. Stir in butter and cheese',
            prepTime: '20 mins',
            cookTime: '30 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Ceviche',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Peruvian raw fish cured in citrus',
            recipe: '1. Cut fish into cubes\n2. Marinate in lime juice\n3. Add onions, peppers, and cilantro\n4. Serve with corn and sweet potato',
            prepTime: '20 mins',
            cookTime: '0 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Grilled Scallops',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Seared scallops with brown butter',
            recipe: '1. Season scallops\n2. Sear in hot pan\n3. Add butter and herbs\n4. Serve immediately',
            prepTime: '10 mins',
            cookTime: '5 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Seafood Gumbo',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Louisiana-style seafood stew',
            recipe: '1. Make roux with flour and oil\n2. Add vegetables and stock\n3. Add seafood and simmer\n4. Serve with rice',
            prepTime: '30 mins',
            cookTime: '1 hour',
            difficulty: 'Hard'
        },
        {
            title: 'Baked Cod',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Baked cod with herb crust',
            recipe: '1. Season cod fillets\n2. Top with breadcrumb mixture\n3. Bake until flaky\n4. Serve with lemon',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Seafood Linguine',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Pasta with mixed seafood in tomato sauce',
            recipe: '1. Cook linguine\n2. Prepare tomato sauce\n3. Add seafood and cook\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '20 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Grilled Sardines',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Portuguese-style grilled sardines',
            recipe: '1. Clean and season sardines\n2. Grill until charred\n3. Serve with lemon and herbs',
            prepTime: '15 mins',
            cookTime: '10 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Seafood Curry',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Thai-style seafood curry with coconut milk',
            recipe: '1. Cook curry paste in coconut milk\n2. Add vegetables\n3. Add seafood and cook\n4. Garnish with basil',
            prepTime: '20 mins',
            cookTime: '20 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Bouillabaisse',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'French seafood stew with saffron',
            recipe: '1. Make fish stock\n2. Add vegetables and saffron\n3. Add seafood and cook\n4. Serve with rouille',
            prepTime: '30 mins',
            cookTime: '45 mins',
            difficulty: 'Hard'
        },
        {
            title: 'Seafood Pizza',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Pizza topped with mixed seafood',
            recipe: '1. Prepare pizza dough\n2. Add tomato sauce and cheese\n3. Top with seafood\n4. Bake until golden',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Grilled Tuna Steak',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Seared tuna with wasabi sauce',
            recipe: '1. Season tuna steaks\n2. Sear quickly on both sides\n3. Serve with wasabi sauce',
            prepTime: '15 mins',
            cookTime: '10 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Crab Stuffed Mushrooms',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Mushrooms stuffed with crab mixture',
            recipe: '1. Clean mushrooms\n2. Mix crab with cream cheese\n3. Stuff mushrooms\n4. Bake until golden',
            prepTime: '20 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Seafood Alfredo',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy pasta with mixed seafood',
            recipe: '1. Cook pasta\n2. Prepare alfredo sauce\n3. Add seafood and cook\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '20 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Grilled Shrimp Skewers',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Marinated shrimp on skewers',
            recipe: '1. Marinate shrimp\n2. Thread onto skewers\n3. Grill until pink\n4. Serve with dipping sauce',
            prepTime: '20 mins',
            cookTime: '10 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Seafood Lasagna',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Layered pasta with seafood and cheese',
            recipe: '1. Cook lasagna noodles\n2. Layer with seafood and sauce\n3. Top with cheese\n4. Bake until bubbly',
            prepTime: '30 mins',
            cookTime: '45 mins',
            difficulty: 'Hard'
        },
        {
            title: 'Baked Stuffed Clams',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Clams stuffed with breadcrumb mixture',
            recipe: '1. Clean clams\n2. Prepare stuffing\n3. Stuff clams\n4. Bake until golden',
            prepTime: '20 mins',
            cookTime: '20 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Seafood Stir Fry',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Quick stir fry with mixed seafood',
            recipe: '1. Stir fry vegetables\n2. Add seafood\n3. Add sauce\n4. Serve with rice',
            prepTime: '15 mins',
            cookTime: '10 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Grilled Lobster Tails',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Butterflied lobster tails on the grill',
            recipe: '1. Split lobster tails\n2. Brush with butter\n3. Grill until opaque\n4. Serve with lemon',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Seafood Tacos',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Soft tacos with mixed seafood',
            recipe: '1. Cook seafood\n2. Prepare toppings\n3. Warm tortillas\n4. Assemble tacos',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Baked Salmon',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Oven-baked salmon with herbs',
            recipe: '1. Season salmon\n2. Top with herbs\n3. Bake until flaky\n4. Serve with vegetables',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Seafood Pasta Salad',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Cold pasta salad with seafood',
            recipe: '1. Cook pasta and seafood\n2. Mix with vegetables\n3. Add dressing\n4. Chill before serving',
            prepTime: '20 mins',
            cookTime: '0 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Grilled Oysters',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Oysters grilled with garlic butter',
            recipe: '1. Shuck oysters\n2. Top with butter mixture\n3. Grill until bubbly\n4. Serve immediately',
            prepTime: '15 mins',
            cookTime: '10 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Seafood Soup',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Light seafood soup with vegetables',
            recipe: '1. Make broth\n2. Add vegetables\n3. Add seafood\n4. Simmer until cooked',
            prepTime: '20 mins',
            cookTime: '30 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Baked Scallops',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Scallops baked with breadcrumbs',
            recipe: '1. Clean scallops\n2. Top with breadcrumb mixture\n3. Bake until golden\n4. Serve with lemon',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        }
    ],
    'Beef': [
        {
            title: 'Classic Beef Steak',
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
            description: 'Juicy ribeye steak with herb butter',
            recipe: '1. Season steak with salt and pepper\n2. Sear in hot cast iron pan\n3. Add butter, garlic, and herbs\n4. Baste steak with butter\n5. Rest before serving',
            prepTime: '10 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Beef Bourguignon',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Classic French beef stew with red wine',
            recipe: '1. Brown beef cubes in batches\n2. Sauté onions, carrots, and mushrooms\n3. Add red wine and beef stock\n4. Simmer for 2-3 hours until tender\n5. Serve with crusty bread',
            prepTime: '30 mins',
            cookTime: '3 hours',
            difficulty: 'Hard'
        },
        {
            title: 'Beef Stir Fry',
            image: 'https://images.unsplash.com/photo-1542600175-4c1b3a1b3b3b',
            description: 'Quick and flavorful beef stir fry with vegetables',
            recipe: '1. Marinate beef in soy sauce and cornstarch\n2. Stir fry vegetables until crisp-tender\n3. Add beef and cook until browned\n4. Toss with sauce and serve over rice',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Beef Wellington',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Tender beef fillet wrapped in puff pastry',
            recipe: '1. Sear beef fillet\n2. Spread mushroom duxelles\n3. Wrap in prosciutto and pastry\n4. Bake until golden',
            prepTime: '45 mins',
            cookTime: '40 mins',
            difficulty: 'Hard'
        },
        {
            title: 'Beef Tacos',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy ground beef in soft tortillas',
            recipe: '1. Brown ground beef\n2. Add taco seasoning\n3. Warm tortillas\n4. Assemble with toppings',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Beef Curry',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy Indian beef curry with coconut milk',
            recipe: '1. Cook onions and spices\n2. Add beef and brown\n3. Add coconut milk\n4. Simmer until tender',
            prepTime: '20 mins',
            cookTime: '1 hour',
            difficulty: 'Medium'
        },
        {
            title: 'Beef Stroganoff',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy beef with mushrooms and noodles',
            recipe: '1. Brown beef strips\n2. Sauté mushrooms and onions\n3. Add sour cream sauce\n4. Serve over egg noodles',
            prepTime: '20 mins',
            cookTime: '30 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Beef Pot Roast',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Slow-cooked beef with vegetables',
            recipe: '1. Brown roast\n2. Add vegetables and stock\n3. Cook until tender\n4. Thicken gravy',
            prepTime: '20 mins',
            cookTime: '3 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Beef Kebabs',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Marinated beef skewers with vegetables',
            recipe: '1. Marinate beef cubes\n2. Thread onto skewers\n3. Grill until done\n4. Serve with rice',
            prepTime: '30 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Beef Chili',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Hearty beef chili with beans',
            recipe: '1. Brown ground beef\n2. Add vegetables and spices\n3. Add tomatoes and beans\n4. Simmer until thick',
            prepTime: '20 mins',
            cookTime: '1 hour',
            difficulty: 'Easy'
        },
        {
            title: 'Beef Ragu',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Italian beef sauce with pasta',
            recipe: '1. Brown beef\n2. Add vegetables and wine\n3. Simmer until tender\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Beef Bulgogi',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Korean marinated beef',
            recipe: '1. Marinate beef in sauce\n2. Grill or pan-fry\n3. Serve with rice\n4. Add vegetables',
            prepTime: '30 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Beef Enchiladas',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Beef-filled tortillas with sauce',
            recipe: '1. Cook beef filling\n2. Roll in tortillas\n3. Top with sauce\n4. Bake until bubbly',
            prepTime: '30 mins',
            cookTime: '30 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Beef Pho',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Vietnamese beef noodle soup',
            recipe: '1. Make beef broth\n2. Cook rice noodles\n3. Add beef slices\n4. Top with herbs',
            prepTime: '30 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Beef Satay',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Indonesian beef skewers with peanut sauce',
            recipe: '1. Marinate beef\n2. Thread onto skewers\n3. Grill until done\n4. Serve with sauce',
            prepTime: '30 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Beef Goulash',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Hungarian beef stew with paprika',
            recipe: '1. Brown beef cubes\n2. Add vegetables and spices\n3. Simmer until tender\n4. Serve with noodles',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Beef Brisket',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Slow-smoked beef brisket',
            recipe: '1. Rub with spices\n2. Smoke for hours\n3. Rest before slicing\n4. Serve with sauce',
            prepTime: '30 mins',
            cookTime: '12 hours',
            difficulty: 'Hard'
        },
        {
            title: 'Beef Empanadas',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Latin American beef pastries',
            recipe: '1. Make beef filling\n2. Fill pastry dough\n3. Seal and bake\n4. Serve hot',
            prepTime: '30 mins',
            cookTime: '25 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Beef Rendang',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Indonesian spicy beef stew',
            recipe: '1. Cook beef in coconut milk\n2. Add spices and paste\n3. Simmer until tender\n4. Serve with rice',
            prepTime: '30 mins',
            cookTime: '3 hours',
            difficulty: 'Hard'
        },
        {
            title: 'Beef Meatballs',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Italian-style beef meatballs',
            recipe: '1. Mix ground beef with breadcrumbs\n2. Form into balls\n3. Brown in pan\n4. Simmer in sauce',
            prepTime: '20 mins',
            cookTime: '30 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Beef Fajitas',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Sizzling beef with peppers',
            recipe: '1. Marinate beef strips\n2. Cook vegetables\n3. Add beef and cook\n4. Serve with tortillas',
            prepTime: '30 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Beef Short Ribs',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Braised beef short ribs',
            recipe: '1. Brown ribs\n2. Add vegetables and stock\n3. Braise until tender\n4. Reduce sauce',
            prepTime: '20 mins',
            cookTime: '3 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Beef Teriyaki',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Japanese-style beef with sweet sauce',
            recipe: '1. Marinate beef\n2. Cook until done\n3. Add teriyaki sauce\n4. Serve with rice',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Beef Lasagna',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Layered pasta with beef and cheese',
            recipe: '1. Cook beef sauce\n2. Layer with pasta\n3. Add cheese\n4. Bake until bubbly',
            prepTime: '30 mins',
            cookTime: '45 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Beef Kabobs',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Grilled beef and vegetable skewers',
            recipe: '1. Marinate beef\n2. Thread with vegetables\n3. Grill until done\n4. Serve with rice',
            prepTime: '30 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Beef Stew',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Classic beef stew with vegetables',
            recipe: '1. Brown beef cubes\n2. Add vegetables\n3. Add stock and simmer\n4. Thicken if needed',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Easy'
        },
        {
            title: 'Beef Sliders',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Mini beef burgers with toppings',
            recipe: '1. Form small patties\n2. Cook until done\n3. Add toppings\n4. Serve on buns',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Beef Carpaccio',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Thinly sliced raw beef with dressing',
            recipe: '1. Slice beef very thin\n2. Arrange on plate\n3. Add dressing\n4. Garnish with arugula',
            prepTime: '20 mins',
            cookTime: '0 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Beef Fried Rice',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Chinese-style beef with rice',
            recipe: '1. Cook rice\n2. Stir fry beef\n3. Add vegetables\n4. Mix with rice',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Beef Shepherd\'s Pie',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Ground beef with mashed potatoes',
            recipe: '1. Cook beef filling\n2. Top with mashed potatoes\n3. Bake until golden\n4. Serve hot',
            prepTime: '30 mins',
            cookTime: '30 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Beef Gyros',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Greek-style beef in pita',
            recipe: '1. Marinate beef\n2. Cook until done\n3. Warm pita bread\n4. Assemble with toppings',
            prepTime: '30 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Beef Ramen',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Japanese beef noodle soup',
            recipe: '1. Make beef broth\n2. Cook noodles\n3. Add beef slices\n4. Top with vegetables',
            prepTime: '30 mins',
            cookTime: '1 hour',
            difficulty: 'Medium'
        }
    ],
    'Chicken': [
        {
            title: 'Chicken Curry',
            image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6',
            description: 'Spicy Indian chicken curry with coconut milk',
            recipe: '1. Cook onions and spices until fragrant\n2. Add chicken and cook until browned\n3. Pour in coconut milk and simmer\n4. Garnish with fresh cilantro',
            prepTime: '20 mins',
            cookTime: '30 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Parmesan',
            image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
            description: 'Crispy breaded chicken with marinara and cheese',
            recipe: '1. Bread chicken cutlets\n2. Pan fry until golden\n3. Top with marinara and mozzarella\n4. Bake until cheese is melted\n5. Serve with pasta',
            prepTime: '20 mins',
            cookTime: '25 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Honey Garlic Chicken',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Sweet and savory chicken with honey garlic glaze',
            recipe: '1. Season chicken with salt and pepper\n2. Cook until golden brown\n3. Add honey garlic sauce\n4. Simmer until sauce thickens\n5. Garnish with sesame seeds',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Tikka Masala',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy Indian chicken in spiced tomato sauce',
            recipe: '1. Marinate chicken in yogurt and spices\n2. Grill until charred\n3. Simmer in tomato cream sauce\n4. Garnish with cilantro',
            prepTime: '30 mins',
            cookTime: '30 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Fajitas',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Sizzling chicken with peppers and onions',
            recipe: '1. Marinate chicken strips\n2. Cook vegetables\n3. Add chicken and cook\n4. Serve with tortillas',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Alfredo',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy pasta with grilled chicken',
            recipe: '1. Cook pasta\n2. Prepare alfredo sauce\n3. Grill chicken\n4. Toss everything together',
            prepTime: '20 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Satay',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Indonesian chicken skewers with peanut sauce',
            recipe: '1. Marinate chicken\n2. Thread onto skewers\n3. Grill until done\n4. Serve with peanut sauce',
            prepTime: '30 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Pot Pie',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy chicken and vegetables in flaky crust',
            recipe: '1. Cook chicken and vegetables\n2. Make creamy sauce\n3. Fill pie crust\n4. Bake until golden',
            prepTime: '30 mins',
            cookTime: '45 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Shawarma',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Middle Eastern spiced chicken in pita',
            recipe: '1. Marinate chicken\n2. Roast until done\n3. Warm pita bread\n4. Assemble with toppings',
            prepTime: '30 mins',
            cookTime: '1 hour',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Stir Fry',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Quick chicken stir fry with vegetables',
            recipe: '1. Marinate chicken\n2. Stir fry vegetables\n3. Add chicken\n4. Toss with sauce',
            prepTime: '15 mins',
            cookTime: '10 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Enchiladas',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Chicken-filled tortillas with sauce',
            recipe: '1. Cook chicken filling\n2. Roll in tortillas\n3. Top with sauce\n4. Bake until bubbly',
            prepTime: '30 mins',
            cookTime: '30 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Pho',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Vietnamese chicken noodle soup',
            recipe: '1. Make chicken broth\n2. Cook rice noodles\n3. Add chicken slices\n4. Top with herbs',
            prepTime: '30 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Goulash',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Hungarian chicken stew with paprika',
            recipe: '1. Brown chicken\n2. Add vegetables and spices\n3. Simmer until tender\n4. Serve with noodles',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Teriyaki',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Japanese-style chicken with sweet sauce',
            recipe: '1. Marinate chicken\n2. Cook until done\n3. Add teriyaki sauce\n4. Serve with rice',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Lasagna',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Layered pasta with chicken and cheese',
            recipe: '1. Cook chicken sauce\n2. Layer with pasta\n3. Add cheese\n4. Bake until bubbly',
            prepTime: '30 mins',
            cookTime: '45 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Kabobs',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Grilled chicken and vegetable skewers',
            recipe: '1. Marinate chicken\n2. Thread with vegetables\n3. Grill until done\n4. Serve with rice',
            prepTime: '30 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Stew',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Classic chicken stew with vegetables',
            recipe: '1. Brown chicken\n2. Add vegetables\n3. Add stock and simmer\n4. Thicken if needed',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Sliders',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Mini chicken burgers with toppings',
            recipe: '1. Form small patties\n2. Cook until done\n3. Add toppings\n4. Serve on buns',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Fried Rice',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Chinese-style chicken with rice',
            recipe: '1. Cook rice\n2. Stir fry chicken\n3. Add vegetables\n4. Mix with rice',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Shepherd\'s Pie',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Ground chicken with mashed potatoes',
            recipe: '1. Cook chicken filling\n2. Top with mashed potatoes\n3. Bake until golden\n4. Serve hot',
            prepTime: '30 mins',
            cookTime: '30 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Gyros',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Greek-style chicken in pita',
            recipe: '1. Marinate chicken\n2. Cook until done\n3. Warm pita bread\n4. Assemble with toppings',
            prepTime: '30 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Ramen',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Japanese chicken noodle soup',
            recipe: '1. Make chicken broth\n2. Cook noodles\n3. Add chicken slices\n4. Top with vegetables',
            prepTime: '30 mins',
            cookTime: '1 hour',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Tacos',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy chicken in soft tortillas',
            recipe: '1. Cook chicken\n2. Add taco seasoning\n3. Warm tortillas\n4. Assemble with toppings',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Stroganoff',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy chicken with mushrooms and noodles',
            recipe: '1. Brown chicken strips\n2. Sauté mushrooms and onions\n3. Add sour cream sauce\n4. Serve over egg noodles',
            prepTime: '20 mins',
            cookTime: '30 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Pot Roast',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Slow-cooked chicken with vegetables',
            recipe: '1. Brown chicken\n2. Add vegetables and stock\n3. Cook until tender\n4. Thicken gravy',
            prepTime: '20 mins',
            cookTime: '3 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Kebabs',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Marinated chicken skewers with vegetables',
            recipe: '1. Marinate chicken cubes\n2. Thread onto skewers\n3. Grill until done\n4. Serve with rice',
            prepTime: '30 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Chili',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Hearty chicken chili with beans',
            recipe: '1. Brown chicken\n2. Add vegetables and spices\n3. Add tomatoes and beans\n4. Simmer until thick',
            prepTime: '20 mins',
            cookTime: '1 hour',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Ragu',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Italian chicken sauce with pasta',
            recipe: '1. Brown chicken\n2. Add vegetables and wine\n3. Simmer until tender\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Bulgogi',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Korean marinated chicken',
            recipe: '1. Marinate chicken in sauce\n2. Grill or pan-fry\n3. Serve with rice\n4. Add vegetables',
            prepTime: '30 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Enchiladas',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Chicken-filled tortillas with sauce',
            recipe: '1. Cook chicken filling\n2. Roll in tortillas\n3. Top with sauce\n4. Bake until bubbly',
            prepTime: '30 mins',
            cookTime: '30 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Pho',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Vietnamese chicken noodle soup',
            recipe: '1. Make chicken broth\n2. Cook rice noodles\n3. Add chicken slices\n4. Top with herbs',
            prepTime: '30 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Satay',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Indonesian chicken skewers with peanut sauce',
            recipe: '1. Marinate chicken\n2. Thread onto skewers\n3. Grill until done\n4. Serve with sauce',
            prepTime: '30 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Goulash',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Hungarian chicken stew with paprika',
            recipe: '1. Brown chicken\n2. Add vegetables and spices\n3. Simmer until tender\n4. Serve with noodles',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Teriyaki',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Japanese-style chicken with sweet sauce',
            recipe: '1. Marinate chicken\n2. Cook until done\n3. Add teriyaki sauce\n4. Serve with rice',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Lasagna',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Layered pasta with chicken and cheese',
            recipe: '1. Cook chicken sauce\n2. Layer with pasta\n3. Add cheese\n4. Bake until bubbly',
            prepTime: '30 mins',
            cookTime: '45 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Kabobs',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Grilled chicken and vegetable skewers',
            recipe: '1. Marinate chicken\n2. Thread with vegetables\n3. Grill until done\n4. Serve with rice',
            prepTime: '30 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Stew',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Classic chicken stew with vegetables',
            recipe: '1. Brown chicken\n2. Add vegetables\n3. Add stock and simmer\n4. Thicken if needed',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Sliders',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Mini chicken burgers with toppings',
            recipe: '1. Form small patties\n2. Cook until done\n3. Add toppings\n4. Serve on buns',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Fried Rice',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Chinese-style chicken with rice',
            recipe: '1. Cook rice\n2. Stir fry chicken\n3. Add vegetables\n4. Mix with rice',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Shepherd\'s Pie',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Ground chicken with mashed potatoes',
            recipe: '1. Cook chicken filling\n2. Top with mashed potatoes\n3. Bake until golden\n4. Serve hot',
            prepTime: '30 mins',
            cookTime: '30 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Chicken Gyros',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Greek-style chicken in pita',
            recipe: '1. Marinate chicken\n2. Cook until done\n3. Warm pita bread\n4. Assemble with toppings',
            prepTime: '30 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Chicken Ramen',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Japanese chicken noodle soup',
            recipe: '1. Make chicken broth\n2. Cook noodles\n3. Add chicken slices\n4. Top with vegetables',
            prepTime: '30 mins',
            cookTime: '1 hour',
            difficulty: 'Medium'
        }
    ],
    'Pasta': [
        {
            title: 'Spaghetti Carbonara',
            image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
            description: 'Classic Italian pasta with eggs, cheese, and pancetta',
            recipe: '1. Cook spaghetti al dente\n2. Fry pancetta until crispy\n3. Mix eggs with cheese\n4. Toss everything together\n5. Season with black pepper',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Fettuccine Alfredo',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy pasta with parmesan and butter',
            recipe: '1. Cook fettuccine\n2. Make alfredo sauce\n3. Toss pasta with sauce\n4. Top with extra cheese',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Primavera',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spring vegetable pasta with light sauce',
            recipe: '1. Cook pasta\n2. Sauté vegetables\n3. Add white wine\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Lasagna',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Layered pasta with meat sauce and cheese',
            recipe: '1. Cook lasagna noodles\n2. Prepare meat sauce\n3. Layer with cheese\n4. Bake until bubbly',
            prepTime: '30 mins',
            cookTime: '45 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Puttanesca',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with olives and capers',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add olives and capers\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Arrabiata',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with garlic',
            recipe: '1. Cook pasta\n2. Sauté garlic and chili\n3. Add tomatoes\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Bolognese',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Rich meat sauce with pasta',
            recipe: '1. Cook pasta\n2. Make meat sauce\n3. Simmer until thick\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Aglio e Olio',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Simple garlic and oil pasta',
            recipe: '1. Cook pasta\n2. Sauté garlic in oil\n3. Add chili flakes\n4. Toss with pasta',
            prepTime: '10 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Pesto',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Fresh basil pesto with pasta',
            recipe: '1. Make pesto sauce\n2. Cook pasta\n3. Toss together\n4. Top with pine nuts',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Carbonara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy egg and cheese pasta',
            recipe: '1. Cook pasta\n2. Fry pancetta\n3. Mix eggs and cheese\n4. Toss everything',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Marinara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Simple tomato sauce with pasta',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add herbs\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Vongole',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Clam sauce with pasta',
            recipe: '1. Cook pasta\n2. Steam clams\n3. Make sauce\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Amatriciana',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Tomato sauce with guanciale',
            recipe: '1. Cook pasta\n2. Fry guanciale\n3. Add tomatoes\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Cacio e Pepe',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Cheese and pepper pasta',
            recipe: '1. Cook pasta\n2. Mix cheese and pepper\n3. Add pasta water\n4. Toss everything',
            prepTime: '10 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Alla Norma',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Eggplant and tomato pasta',
            recipe: '1. Cook pasta\n2. Fry eggplant\n3. Make tomato sauce\n4. Toss everything',
            prepTime: '20 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Genovese',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Onion sauce with pasta',
            recipe: '1. Cook pasta\n2. Caramelize onions\n3. Add meat\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Puttanesca',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with olives',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add olives and capers\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Alla Vodka',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy tomato vodka sauce',
            recipe: '1. Cook pasta\n2. Make vodka sauce\n3. Add cream\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Carbonara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy egg and cheese pasta',
            recipe: '1. Cook pasta\n2. Fry pancetta\n3. Mix eggs and cheese\n4. Toss everything',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Alfredo',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy cheese sauce with pasta',
            recipe: '1. Cook pasta\n2. Make alfredo sauce\n3. Toss with pasta\n4. Top with cheese',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Primavera',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spring vegetable pasta',
            recipe: '1. Cook pasta\n2. Sauté vegetables\n3. Add white wine\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Lasagna',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Layered pasta with sauce and cheese',
            recipe: '1. Cook lasagna noodles\n2. Prepare meat sauce\n3. Layer with cheese\n4. Bake until bubbly',
            prepTime: '30 mins',
            cookTime: '45 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Puttanesca',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with olives',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add olives and capers\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Arrabiata',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with garlic',
            recipe: '1. Cook pasta\n2. Sauté garlic and chili\n3. Add tomatoes\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Bolognese',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Rich meat sauce with pasta',
            recipe: '1. Cook pasta\n2. Make meat sauce\n3. Simmer until thick\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Aglio e Olio',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Simple garlic and oil pasta',
            recipe: '1. Cook pasta\n2. Sauté garlic in oil\n3. Add chili flakes\n4. Toss with pasta',
            prepTime: '10 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Pesto',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Fresh basil pesto with pasta',
            recipe: '1. Make pesto sauce\n2. Cook pasta\n3. Toss together\n4. Top with pine nuts',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Carbonara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy egg and cheese pasta',
            recipe: '1. Cook pasta\n2. Fry pancetta\n3. Mix eggs and cheese\n4. Toss everything',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Marinara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Simple tomato sauce with pasta',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add herbs\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Vongole',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Clam sauce with pasta',
            recipe: '1. Cook pasta\n2. Steam clams\n3. Make sauce\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Amatriciana',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Tomato sauce with guanciale',
            recipe: '1. Cook pasta\n2. Fry guanciale\n3. Add tomatoes\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Cacio e Pepe',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Cheese and pepper pasta',
            recipe: '1. Cook pasta\n2. Mix cheese and pepper\n3. Add pasta water\n4. Toss everything',
            prepTime: '10 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Alla Norma',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Eggplant and tomato pasta',
            recipe: '1. Cook pasta\n2. Fry eggplant\n3. Make tomato sauce\n4. Toss everything',
            prepTime: '20 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Genovese',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Onion sauce with pasta',
            recipe: '1. Cook pasta\n2. Caramelize onions\n3. Add meat\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Puttanesca',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with olives',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add olives and capers\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Alla Vodka',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy tomato vodka sauce',
            recipe: '1. Cook pasta\n2. Make vodka sauce\n3. Add cream\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Carbonara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy egg and cheese pasta',
            recipe: '1. Cook pasta\n2. Fry pancetta\n3. Mix eggs and cheese\n4. Toss everything',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Alfredo',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy cheese sauce with pasta',
            recipe: '1. Cook pasta\n2. Make alfredo sauce\n3. Toss with pasta\n4. Top with cheese',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Primavera',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spring vegetable pasta',
            recipe: '1. Cook pasta\n2. Sauté vegetables\n3. Add white wine\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Lasagna',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Layered pasta with sauce and cheese',
            recipe: '1. Cook lasagna noodles\n2. Prepare meat sauce\n3. Layer with cheese\n4. Bake until bubbly',
            prepTime: '30 mins',
            cookTime: '45 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Puttanesca',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with olives',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add olives and capers\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Arrabiata',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with garlic',
            recipe: '1. Cook pasta\n2. Sauté garlic and chili\n3. Add tomatoes\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Bolognese',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Rich meat sauce with pasta',
            recipe: '1. Cook pasta\n2. Make meat sauce\n3. Simmer until thick\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Aglio e Olio',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Simple garlic and oil pasta',
            recipe: '1. Cook pasta\n2. Sauté garlic in oil\n3. Add chili flakes\n4. Toss with pasta',
            prepTime: '10 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Pesto',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Fresh basil pesto with pasta',
            recipe: '1. Make pesto sauce\n2. Cook pasta\n3. Toss together\n4. Top with pine nuts',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Carbonara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy egg and cheese pasta',
            recipe: '1. Cook pasta\n2. Fry pancetta\n3. Mix eggs and cheese\n4. Toss everything',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Marinara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Simple tomato sauce with pasta',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add herbs\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Vongole',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Clam sauce with pasta',
            recipe: '1. Cook pasta\n2. Steam clams\n3. Make sauce\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Amatriciana',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Tomato sauce with guanciale',
            recipe: '1. Cook pasta\n2. Fry guanciale\n3. Add tomatoes\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Cacio e Pepe',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Cheese and pepper pasta',
            recipe: '1. Cook pasta\n2. Mix cheese and pepper\n3. Add pasta water\n4. Toss everything',
            prepTime: '10 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Alla Norma',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Eggplant and tomato pasta',
            recipe: '1. Cook pasta\n2. Fry eggplant\n3. Make tomato sauce\n4. Toss everything',
            prepTime: '20 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Genovese',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Onion sauce with pasta',
            recipe: '1. Cook pasta\n2. Caramelize onions\n3. Add meat\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Puttanesca',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with olives',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add olives and capers\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Alla Vodka',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy tomato vodka sauce',
            recipe: '1. Cook pasta\n2. Make vodka sauce\n3. Add cream\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Carbonara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy egg and cheese pasta',
            recipe: '1. Cook pasta\n2. Fry pancetta\n3. Mix eggs and cheese\n4. Toss everything',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Alfredo',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy cheese sauce with pasta',
            recipe: '1. Cook pasta\n2. Make alfredo sauce\n3. Toss with pasta\n4. Top with cheese',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Primavera',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spring vegetable pasta',
            recipe: '1. Cook pasta\n2. Sauté vegetables\n3. Add white wine\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Lasagna',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Layered pasta with sauce and cheese',
            recipe: '1. Cook lasagna noodles\n2. Prepare meat sauce\n3. Layer with cheese\n4. Bake until bubbly',
            prepTime: '30 mins',
            cookTime: '45 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Puttanesca',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with olives',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add olives and capers\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Arrabiata',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with garlic',
            recipe: '1. Cook pasta\n2. Sauté garlic and chili\n3. Add tomatoes\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Bolognese',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Rich meat sauce with pasta',
            recipe: '1. Cook pasta\n2. Make meat sauce\n3. Simmer until thick\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Aglio e Olio',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Simple garlic and oil pasta',
            recipe: '1. Cook pasta\n2. Sauté garlic in oil\n3. Add chili flakes\n4. Toss with pasta',
            prepTime: '10 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Pesto',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Fresh basil pesto with pasta',
            recipe: '1. Make pesto sauce\n2. Cook pasta\n3. Toss together\n4. Top with pine nuts',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Carbonara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy egg and cheese pasta',
            recipe: '1. Cook pasta\n2. Fry pancetta\n3. Mix eggs and cheese\n4. Toss everything',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Marinara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Simple tomato sauce with pasta',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add herbs\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Vongole',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Clam sauce with pasta',
            recipe: '1. Cook pasta\n2. Steam clams\n3. Make sauce\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Amatriciana',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Tomato sauce with guanciale',
            recipe: '1. Cook pasta\n2. Fry guanciale\n3. Add tomatoes\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Cacio e Pepe',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Cheese and pepper pasta',
            recipe: '1. Cook pasta\n2. Mix cheese and pepper\n3. Add pasta water\n4. Toss everything',
            prepTime: '10 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Alla Norma',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Eggplant and tomato pasta',
            recipe: '1. Cook pasta\n2. Fry eggplant\n3. Make tomato sauce\n4. Toss everything',
            prepTime: '20 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Genovese',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Onion sauce with pasta',
            recipe: '1. Cook pasta\n2. Caramelize onions\n3. Add meat\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Puttanesca',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with olives',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add olives and capers\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Alla Vodka',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy tomato vodka sauce',
            recipe: '1. Cook pasta\n2. Make vodka sauce\n3. Add cream\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Carbonara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy egg and cheese pasta',
            recipe: '1. Cook pasta\n2. Fry pancetta\n3. Mix eggs and cheese\n4. Toss everything',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Alfredo',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy cheese sauce with pasta',
            recipe: '1. Cook pasta\n2. Make alfredo sauce\n3. Toss with pasta\n4. Top with cheese',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Primavera',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spring vegetable pasta',
            recipe: '1. Cook pasta\n2. Sauté vegetables\n3. Add white wine\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Lasagna',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Layered pasta with sauce and cheese',
            recipe: '1. Cook lasagna noodles\n2. Prepare meat sauce\n3. Layer with cheese\n4. Bake until bubbly',
            prepTime: '30 mins',
            cookTime: '45 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Puttanesca',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with olives',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add olives and capers\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Arrabiata',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with garlic',
            recipe: '1. Cook pasta\n2. Sauté garlic and chili\n3. Add tomatoes\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Bolognese',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Rich meat sauce with pasta',
            recipe: '1. Cook pasta\n2. Make meat sauce\n3. Simmer until thick\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Aglio e Olio',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Simple garlic and oil pasta',
            recipe: '1. Cook pasta\n2. Sauté garlic in oil\n3. Add chili flakes\n4. Toss with pasta',
            prepTime: '10 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Pesto',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Fresh basil pesto with pasta',
            recipe: '1. Make pesto sauce\n2. Cook pasta\n3. Toss together\n4. Top with pine nuts',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Carbonara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy egg and cheese pasta',
            recipe: '1. Cook pasta\n2. Fry pancetta\n3. Mix eggs and cheese\n4. Toss everything',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Marinara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Simple tomato sauce with pasta',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add herbs\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Vongole',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Clam sauce with pasta',
            recipe: '1. Cook pasta\n2. Steam clams\n3. Make sauce\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Amatriciana',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Tomato sauce with guanciale',
            recipe: '1. Cook pasta\n2. Fry guanciale\n3. Add tomatoes\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Cacio e Pepe',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Cheese and pepper pasta',
            recipe: '1. Cook pasta\n2. Mix cheese and pepper\n3. Add pasta water\n4. Toss everything',
            prepTime: '10 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Alla Norma',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Eggplant and tomato pasta',
            recipe: '1. Cook pasta\n2. Fry eggplant\n3. Make tomato sauce\n4. Toss everything',
            prepTime: '20 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Genovese',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Onion sauce with pasta',
            recipe: '1. Cook pasta\n2. Caramelize onions\n3. Add meat\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Puttanesca',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with olives',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add olives and capers\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Alla Vodka',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy tomato vodka sauce',
            recipe: '1. Cook pasta\n2. Make vodka sauce\n3. Add cream\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Carbonara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy egg and cheese pasta',
            recipe: '1. Cook pasta\n2. Fry pancetta\n3. Mix eggs and cheese\n4. Toss everything',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Alfredo',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy cheese sauce with pasta',
            recipe: '1. Cook pasta\n2. Make alfredo sauce\n3. Toss with pasta\n4. Top with cheese',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Primavera',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spring vegetable pasta',
            recipe: '1. Cook pasta\n2. Sauté vegetables\n3. Add white wine\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Lasagna',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Layered pasta with sauce and cheese',
            recipe: '1. Cook lasagna noodles\n2. Prepare meat sauce\n3. Layer with cheese\n4. Bake until bubbly',
            prepTime: '30 mins',
            cookTime: '45 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Puttanesca',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with olives',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add olives and capers\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Arrabiata',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with garlic',
            recipe: '1. Cook pasta\n2. Sauté garlic and chili\n3. Add tomatoes\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Bolognese',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Rich meat sauce with pasta',
            recipe: '1. Cook pasta\n2. Make meat sauce\n3. Simmer until thick\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Aglio e Olio',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Simple garlic and oil pasta',
            recipe: '1. Cook pasta\n2. Sauté garlic in oil\n3. Add chili flakes\n4. Toss with pasta',
            prepTime: '10 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Pesto',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Fresh basil pesto with pasta',
            recipe: '1. Make pesto sauce\n2. Cook pasta\n3. Toss together\n4. Top with pine nuts',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Carbonara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy egg and cheese pasta',
            recipe: '1. Cook pasta\n2. Fry pancetta\n3. Mix eggs and cheese\n4. Toss everything',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Marinara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Simple tomato sauce with pasta',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add herbs\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Vongole',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Clam sauce with pasta',
            recipe: '1. Cook pasta\n2. Steam clams\n3. Make sauce\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Amatriciana',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Tomato sauce with guanciale',
            recipe: '1. Cook pasta\n2. Fry guanciale\n3. Add tomatoes\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Cacio e Pepe',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Cheese and pepper pasta',
            recipe: '1. Cook pasta\n2. Mix cheese and pepper\n3. Add pasta water\n4. Toss everything',
            prepTime: '10 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Alla Norma',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Eggplant and tomato pasta',
            recipe: '1. Cook pasta\n2. Fry eggplant\n3. Make tomato sauce\n4. Toss everything',
            prepTime: '20 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Genovese',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Onion sauce with pasta',
            recipe: '1. Cook pasta\n2. Caramelize onions\n3. Add meat\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Puttanesca',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with olives',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add olives and capers\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Alla Vodka',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy tomato vodka sauce',
            recipe: '1. Cook pasta\n2. Make vodka sauce\n3. Add cream\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Carbonara',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy egg and cheese pasta',
            recipe: '1. Cook pasta\n2. Fry pancetta\n3. Mix eggs and cheese\n4. Toss everything',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Alfredo',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Creamy cheese sauce with pasta',
            recipe: '1. Cook pasta\n2. Make alfredo sauce\n3. Toss with pasta\n4. Top with cheese',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Primavera',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spring vegetable pasta',
            recipe: '1. Cook pasta\n2. Sauté vegetables\n3. Add white wine\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Lasagna',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Layered pasta with sauce and cheese',
            recipe: '1. Cook lasagna noodles\n2. Prepare meat sauce\n3. Layer with cheese\n4. Bake until bubbly',
            prepTime: '30 mins',
            cookTime: '45 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Puttanesca',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with olives',
            recipe: '1. Cook pasta\n2. Make tomato sauce\n3. Add olives and capers\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '20 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Arrabiata',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Spicy tomato sauce with garlic',
            recipe: '1. Cook pasta\n2. Sauté garlic and chili\n3. Add tomatoes\n4. Toss with pasta',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pasta Bolognese',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Rich meat sauce with pasta',
            recipe: '1. Cook pasta\n2. Make meat sauce\n3. Simmer until thick\n4. Toss with pasta',
            prepTime: '20 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        },
        {
            title: 'Pasta Aglio e Olio',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Simple garlic and oil pasta',
            description: 'Korean marinated pork',
            recipe: '1. Marinate pork in sauce\n2. Grill or pan-fry\n3. Serve with rice\n4. Add vegetables',
            prepTime: '30 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Pork Enchiladas',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Pork-filled tortillas with sauce',
            recipe: '1. Cook pork filling\n2. Roll in tortillas\n3. Top with sauce\n4. Bake until bubbly',
            prepTime: '30 mins',
            cookTime: '30 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Pork Pho',
            image: 'https://images.unsplash.com/photo-1565299624943-baea1379647c',
            description: 'Vietnamese pork noodle soup',
            recipe: '1. Make pork broth\n2. Cook rice noodles\n3. Add pork slices\n4. Top with herbs',
            prepTime: '30 mins',
            cookTime: '2 hours',
            difficulty: 'Medium'
        }
    ],
    'Vegetarian': [
        {
            title: 'Vegetable Stir Fry',
            image: 'https://images.unsplash.com/photo-1542600175-4c1b3a1b3b3b',
            description: 'Colorful vegetable stir fry with tofu',
            recipe: '1. Stir fry vegetables until crisp-tender\n2. Add tofu and sauce\n3. Cook until heated through\n4. Serve with rice',
            prepTime: '15 mins',
            cookTime: '15 mins',
            difficulty: 'Easy'
        },
        {
            title: 'Mushroom Risotto',
            image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
            description: 'Creamy mushroom risotto with parmesan',
            recipe: '1. Sauté mushrooms and onions\n2. Add rice and toast\n3. Gradually add stock\n4. Stir in cheese and butter',
            prepTime: '15 mins',
            cookTime: '30 mins',
            difficulty: 'Medium'
        },
        {
            title: 'Vegetable Curry',
            image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6',
            description: 'Spicy vegetable curry with coconut milk',
            recipe: '1. Cook onions and spices\n2. Add vegetables and cook\n3. Pour in coconut milk\n4. Simmer until tender',
            prepTime: '20 mins',
            cookTime: '25 mins',
            difficulty: 'Medium'
        }
    ]
}; 