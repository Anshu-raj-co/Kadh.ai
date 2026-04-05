import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

const SEED_RECIPES = [
  {
    title: 'Dal Tadka',
    description: 'Slow-cooked yellow lentils tempered with cumin, garlic, and red chilies in ghee. A soul-satisfying North Indian classic that tastes like home.',
    time: '35 min', servings: 4, health_score: 88, calories: 280,
    protein: 14, carbs: 42, fat: 7, fiber: 9,
    tags: ['Vegan', 'High Fiber', 'Indian', 'Comfort Food'],
    image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['1.5 cups yellow lentils (dal)', '1 large onion, diced', '2 tomatoes, chopped', '4 cloves garlic', '1 inch ginger', '1 tsp cumin seeds', '2 dried red chilies', '2 tbsp ghee', '1 tsp turmeric', '1 tsp coriander powder', 'Salt to taste', 'Fresh coriander'],
    steps: ['Wash and soak lentils in cold water for 20 minutes.', 'Pressure cook lentils with turmeric and salt until very soft, about 3 whistles.', 'Heat ghee in a heavy pan and add cumin seeds until they splutter.', 'Add diced onion and cook on medium heat until deep golden brown, about 10 minutes.', 'Add ginger-garlic paste and stir for 2 minutes until fragrant.', 'Add chopped tomatoes and all remaining spices, cook until oil separates.', 'Pour the tempering over the cooked lentils and stir well.', 'Simmer together for 5 minutes and garnish with fresh coriander.'],
    tips: 'The key is caramelising the onions properly.',
  },
  {
    title: 'Mediterranean Chickpea Bowl',
    description: 'Crispy roasted chickpeas over herbed quinoa with fresh vegetables and a silky lemon-tahini dressing.',
    time: '25 min', servings: 2, health_score: 94, calories: 420,
    protein: 18, carbs: 58, fat: 12, fiber: 14,
    tags: ['Vegan', 'High Protein', 'Mediterranean', 'Quick'],
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['1 can chickpeas', '1 cup quinoa', 'cherry tomatoes', 'cucumber', 'tahini'],
    steps: ['Cook quinoa.', 'Roast chickpeas.', 'Whisk dressing.', 'Assemble bowl.'],
    tips: 'Dry the chickpeas thoroughly for maximum crunch.',
  },
  {
    title: 'Palak Paneer',
    description: 'Fresh cottage cheese cubes bathed in a velvety, vibrant spinach gravy.',
    time: '40 min', servings: 3, health_score: 82, calories: 340,
    protein: 22, carbs: 18, fat: 20, fiber: 6,
    tags: ['Vegetarian', 'High Protein', 'Indian', 'Gluten-Free'],
    image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Paneer', 'Spinach', 'Onion', 'Spices'],
    steps: ['Blanch spinach.', 'Sauté aromatics.', 'Blend gravy.', 'Add paneer.'],
    tips: 'The ice bath keeps the spinach bright green.',
  },
  {
    title: 'Masala Omelette',
    description: 'Fluffy eggs packed with sautéed onions, fresh green chili, and aromatic spices.',
    time: '10 min', servings: 1, health_score: 85, calories: 220,
    protein: 18, carbs: 6, fat: 14, fiber: 2,
    tags: ['High Protein', 'Quick', 'Vegetarian', 'Breakfast'],
    image_url: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Eggs', 'Onion', 'Chili', 'Tomato'],
    steps: ['Beat eggs.', 'Sauté veg.', 'Pour eggs.', 'Fold and serve.'],
    tips: 'Keep the heat medium-low to prevent rubbery eggs.',
  },
  {
    title: 'Rajma Chawal',
    description: 'Slow-simmered kidney beans in a rich masala over fluffy basmati rice.',
    time: '55 min', servings: 4, health_score: 90, calories: 380,
    protein: 16, carbs: 68, fat: 5, fiber: 15,
    tags: ['Vegan', 'High Fiber', 'Indian', 'Comfort Food'],
    image_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Kidney beans', 'Rice', 'Onion', 'Tomato'],
    steps: ['Cook beans.', 'Make masala.', 'Simmer beans in gravy.', 'Serve over rice.'],
    tips: 'Use the bean cooking water for the gravy.',
  },
  {
    title: 'Chicken Tikka Masala',
    description: 'Charred chicken in a lusciously creamy, spiced tomato sauce.',
    time: '60 min', servings: 4, health_score: 74, calories: 480,
    protein: 38, carbs: 22, fat: 26, fiber: 4,
    tags: ['High Protein', 'Indian', 'Comfort Food'],
    image_url: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Chicken', 'Yogurt', 'Tomato purée', 'Cream'],
    steps: ['Marinate and grill chicken.', 'Make tomato sauce.', 'Blend sauce.', 'Combine.'],
    tips: 'Don\'t skip the char on the chicken.',
  },
  {
    title: 'Avocado Toast',
    description: 'Creamy avocado on sourdough with poached eggs and chili flakes.',
    time: '15 min', servings: 2, health_score: 86, calories: 390,
    protein: 16, carbs: 32, fat: 22, fiber: 8,
    tags: ['Vegetarian', 'Quick', 'Breakfast'],
    image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Avocado', 'Sourdough', 'Eggs', 'Lemon'],
    steps: ['Toast bread.', 'Mash avocado.', 'Poach eggs.', 'Assemble.'],
    tips: 'Use fresh eggs for perfect poaching.',
  },
  {
    title: 'Miso Glazed Salmon',
    description: 'Flaky salmon fillets with a sweet-savoury white miso glaze.',
    time: '20 min', servings: 2, health_score: 91, calories: 410,
    protein: 42, carbs: 14, fat: 20, fiber: 3,
    tags: ['High Protein', 'Healthy & Light', 'Quick'],
    image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Salmon', 'Miso paste', 'Mirin', 'Bok choy'],
    steps: ['Make glaze.', 'Marinate salmon.', 'Sear and bake.', 'Serve with greens.'],
    tips: 'Watch the glaze closely as it burns easily.',
  },
  {
    title: 'Overnight Oats',
    description: 'Creamy oats soaked in almond milk with chia seeds and berries.',
    time: '5 min', servings: 1, health_score: 92, calories: 340,
    protein: 12, carbs: 58, fat: 8, fiber: 10,
    tags: ['Vegan', 'Quick', 'Breakfast'],
    image_url: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Oats', 'Almond milk', 'Chia seeds', 'Berries'],
    steps: ['Mix ingredients.', 'Refrigerate overnight.', 'Add toppings.', 'Enjoy.'],
    tips: 'Prepare these on Sunday for easy weekday breakfasts.',
  },
  {
    title: 'Butter Chicken',
    description: 'Velvety, mildly spiced tomato and butter chicken.',
    time: '50 min', servings: 4, health_score: 72, calories: 510,
    protein: 36, carbs: 18, fat: 32, fiber: 3,
    tags: ['High Protein', 'Indian', 'Comfort Food'],
    image_url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Chicken', 'Butter', 'Tomato', 'Cream'],
    steps: ['Marinate chicken.', 'Cook in sauce.', 'Add cream.', 'Finish with fenugreek.'],
    tips: 'Rub the dried fenugreek between your palms for more aroma.',
  },
  {
    title: 'Greek Salad',
    description: 'Chunky tomatoes, cucumber, olives, and feta in olive oil.',
    time: '10 min', servings: 2, health_score: 89, calories: 280,
    protein: 10, carbs: 14, fat: 20, fiber: 4,
    tags: ['Vegetarian', 'Quick', 'Mediterranean'],
    image_url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Tomatoes', 'Cucumber', 'Feta', 'Olives'],
    steps: ['Chop veg.', 'Arrange olives.', 'Top with feta block.', 'Drizzle oil.'],
    tips: 'Don\'t crumble the feta; leave it in a large block on top.',
  },
  {
    title: 'Paneer Tikka',
    description: 'Smoky, charred paneer cubes marinated in spiced yogurt.',
    time: '30 min', servings: 3, health_score: 78, calories: 360,
    protein: 24, carbs: 14, fat: 22, fiber: 3,
    tags: ['Vegetarian', 'High Protein', 'Indian'],
    image_url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Paneer', 'Yogurt', 'Peppers', 'Tikka spices'],
    steps: ['Marinate.', 'Skewer.', 'Char in pan.', 'Serve with chutney.'],
    tips: 'The pan must be smoking hot for a good char.',
  },
  {
    title: 'Shakshuka',
    description: 'Eggs poached in a smoky, spiced tomato and pepper sauce.',
    time: '25 min', servings: 2, health_score: 84, calories: 290,
    protein: 16, carbs: 20, fat: 16, fiber: 5,
    tags: ['Vegetarian', 'Mediterranean', 'Quick'],
    image_url: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Eggs', 'Tomatoes', 'Peppers', 'Spices'],
    steps: ['Sauté veg.', 'Simmer sauce.', 'Crack eggs in.', 'Cover and poach.'],
    tips: 'Serve with crusty bread for dipping.',
  },
  {
    title: 'Aloo Gobi',
    description: 'Potatoes and cauliflower slow-cooked with turmeric and cumin.',
    time: '35 min', servings: 3, health_score: 87, calories: 220,
    protein: 7, carbs: 38, fat: 6, fiber: 8,
    tags: ['Vegan', 'Indian', 'Healthy & Light'],
    image_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Potatoes', 'Cauliflower', 'Turmeric', 'Cumin'],
    steps: ['Toast seeds.', 'Sauté aromatics.', 'Add potato.', 'Add cauliflower and steam.'],
    tips: 'Do not add water; cook in its own moisture.',
  },
  {
    title: 'Thai Basil Fried Rice',
    description: 'Wok-tossed rice with Thai basil and crispy fried egg.',
    time: '15 min', servings: 2, health_score: 76, calories: 440,
    protein: 14, carbs: 72, fat: 12, fiber: 3,
    tags: ['Quick', 'Comfort Food'],
    image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Rice', 'Basil', 'Chili', 'Eggs'],
    steps: ['Heat wok.', 'Stir-fry aromatics.', 'Add rice.', 'Toss with basil.'],
    tips: 'Use day-old rice for the best texture.',
  },
  {
    title: 'Lemon Herb Roast Chicken',
    description: 'Golden, crackling-skinned chicken with garlic and lemon.',
    time: '80 min', servings: 4, health_score: 80, calories: 520,
    protein: 48, carbs: 6, fat: 32, fiber: 1,
    tags: ['High Protein', 'Comfort Food'],
    image_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c7?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Chicken', 'Lemon', 'Garlic', 'Rosemary'],
    steps: ['Butter under skin.', 'Stuff cavity.', 'Roast high then low.', 'Rest 15 mins.'],
    tips: 'Always rest the chicken before carving.',
  },
  {
    title: 'Saag Aloo',
    description: 'Earthy spinach and tender potato in a light masala.',
    time: '30 min', servings: 3, health_score: 88, calories: 210,
    protein: 8, carbs: 32, fat: 7, fiber: 9,
    tags: ['Vegan', 'Indian', 'High Fiber'],
    image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Potatoes', 'Spinach', 'Mustard seeds', 'Spices'],
    steps: ['Parboil potatoes.', 'Sauté aromatics.', 'Add potatoes.', 'Wilt spinach.'],
    tips: 'Mustard seeds add the authentic nutty flavor.',
  },
  {
    title: 'Pasta Aglio e Olio',
    description: 'Spaghetti with slow-cooked garlic, olive oil, and chili.',
    time: '20 min', servings: 2, health_score: 73, calories: 480,
    protein: 14, carbs: 70, fat: 18, fiber: 4,
    tags: ['Vegan', 'Mediterranean', 'Quick'],
    image_url: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Spaghetti', 'Garlic', 'Olive oil', 'Chili'],
    steps: ['Boil pasta.', 'Infuse oil.', 'Combine with water.', 'Toss with parsley.'],
    tips: 'Start the garlic in cold oil to prevent burning.',
  },
  {
    title: 'Mango Lassi',
    description: 'Creamy yogurt drink with ripe mango and cardamom.',
    time: '5 min', servings: 2, health_score: 82, calories: 220,
    protein: 8, carbs: 42, fat: 3, fiber: 2,
    tags: ['Vegetarian', 'Indian', 'Quick'],
    image_url: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Mango', 'Yogurt', 'Milk', 'Cardamom'],
    steps: ['Blend all.', 'Adjust sweetness.', 'Chill.', 'Serve.'],
    tips: 'Alphonso mangoes provide the best flavor.',
  },
  {
    title: 'Black Bean Tacos',
    description: 'Smoky black beans with lime-dressed slaw and avocado.',
    time: '20 min', servings: 2, health_score: 88, calories: 400,
    protein: 16, carbs: 58, fat: 14, fiber: 14,
    tags: ['Vegan', 'High Fiber', 'Quick'],
    image_url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Black beans', 'Tortillas', 'Avocado', 'Slaw'],
    steps: ['Season beans.', 'Mash avocado.', 'Char tortillas.', 'Assemble.'],
    tips: 'Char tortillas over an open flame for extra flavor.',
  },
  {
    title: 'Chole Bhature',
    description: 'Spiced chickpeas with pillowy deep-fried bread.',
    time: '60 min', servings: 4, health_score: 69, calories: 560,
    protein: 18, carbs: 82, fat: 18, fiber: 12,
    tags: ['Vegan', 'Indian', 'Comfort Food'],
    image_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Chickpeas', 'Flour', 'Yogurt', 'Masala'],
    steps: ['Cook dark chickpeas.', 'Knead dough.', 'Simmer gravy.', 'Fry bhature.'],
    tips: 'A tea bag in the boil gives the deep dark color.',
  },
  {
    title: 'Egg Fried Rice',
    description: 'Wok-charred rice with scrambled eggs and spring onions.',
    time: '12 min', servings: 2, health_score: 77, calories: 390,
    protein: 14, carbs: 62, fat: 10, fiber: 3,
    tags: ['Vegetarian', 'Quick', 'Comfort Food'],
    image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Rice', 'Eggs', 'Soy sauce', 'Onion'],
    steps: ['Scramble eggs.', 'Stir-fry aromatics.', 'Toss rice.', 'Add sauce.'],
    tips: 'High heat is key for wok hei flavor.',
  },
  {
    title: 'Vegetable Biryani',
    description: 'Fragrant saffron rice layered with spiced vegetables.',
    time: '70 min', servings: 4, health_score: 83, calories: 420,
    protein: 11, carbs: 78, fat: 9, fiber: 10,
    tags: ['Vegan', 'Indian', 'Comfort Food'],
    image_url: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Rice', 'Mixed veg', 'Saffron', 'Spices'],
    steps: ['Parboil rice.', 'Sauté veg.', 'Layer rice and veg.', 'Steam (Dum).'],
    tips: 'Don\'t open the lid during the steaming process.',
  },
  {
    title: 'French Onion Soup',
    description: 'Sweet caramelized onions in broth with Gruyère crust.',
    time: '75 min', servings: 4, health_score: 72, calories: 380,
    protein: 12, carbs: 40, fat: 18, fiber: 4,
    tags: ['Vegetarian', 'Comfort Food'],
    image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Onions', 'Butter', 'Broth', 'Gruyère'],
    steps: ['Caramelize onions.', 'Deglaze.', 'Simmer.', 'Broil with cheese.'],
    tips: 'Caramelizing onions takes a full 45 minutes—don\'t rush.',
  },
  {
    title: 'Banana Pancakes',
    description: 'Fluffy 3-ingredient pancakes with banana and oats.',
    time: '15 min', servings: 2, health_score: 86, calories: 260,
    protein: 12, carbs: 38, fat: 7, fiber: 4,
    tags: ['Vegetarian', 'Quick', 'Breakfast'],
    image_url: 'https://images.unsplash.com/photo-1565299543923-37dd37887442?auto=format&fit=crop&q=80&w=1080',
    ingredients: ['Bananas', 'Eggs', 'Oats', 'Cinnamon'],
    steps: ['Mash bananas.', 'Whisk with eggs.', 'Add oats.', 'Cook and flip.'],
    tips: 'Use overripe bananas for the best sweetness.',
  },
]

export async function GET() {
  try {
    const admin = createAdminClient()

    // --- NUCLEAR RESET STEP ---
    // This deletes everything in the table first!
    await admin.from('recipes').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    const results: string[] = []
    for (let i = 0; i < SEED_RECIPES.length; i += 5) {
      // Stripping out 'tips' before inserting to match your DB schema
      const batch = SEED_RECIPES.slice(i, i + 5).map(({ tips, ...dbReadyRecipe }) => dbReadyRecipe)

      const { data, error } = await admin
        .from('recipes')
        .insert(batch as any)
        .select('id, title')

      if (error) {
        console.error('[seed] Insert error:', error.message)
        continue
      }

      data?.forEach((r: any) => results.push(r.title))
    }

    return NextResponse.json({
      message: `Database Purged and Re-Seeded with ${results.length} high-quality recipes.`,
      titles: results,
    })

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: `Seed failed: ${message}` }, { status: 500 })
  }
}