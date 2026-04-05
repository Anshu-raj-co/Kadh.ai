# 🍳 Kadh.ai

**An AI-powered culinary assistant that transforms your available ingredients into structured, macro-balanced recipes.**

---

## 🚀 Live Demo

https://kadh-ai.vercel.app/

---

## 📸 Demo Preview

### 🔹 Recipe Generation Flow

![Kadhaidemonstration-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/fb43bc3b-8d48-45ae-8c22-8478c49a3b15)


### 🔹 Example Output

**Input:**

```
onion, tomato, paneer
```

**Output:**

* Paneer Masala
* Calories: ~420 kcal
* Protein: 22g
* Carbs: 18g
* Fat: 28g
* Fiber: 5g
* Health Score: 8.2 / 10

![Generated Recipe](./public/kadh-hero.png)

---

## 🧠 Overview

Kadh.ai solves the everyday **“what’s for dinner?”** problem using AI.

By inputting available pantry ingredients, dietary restrictions, and allergies, the app generates **realistic, structured, and nutritionally balanced recipes** using Google Gemini.

---

## ✨ Key Features

### 🥘 Pantry-to-Plate Generation

Generate complete recipes instantly from available ingredients.

### 🚫 Strict Dietary Guardrails

Ensures allergies and restrictions are strictly enforced during generation.

### 📊 Nutritional Intelligence

* Calories
* Macronutrients (Protein, Carbs, Fat, Fiber)
* Serving size estimation

### 🧠 Health Score (Transparent Logic)

Each recipe is assigned a **Health Score (0–10)** based on:

* Protein density (higher = better)
* Calorie balance per serving
* Fiber content
* Fat proportion

> This score helps users quickly evaluate nutritional quality.

---

### 🖼️ Dynamic Media Integration

* Fetches relevant food images using Unsplash API
* Improves visual experience automatically

### 💾 Persistent Recipe Library

* Save recipes to Supabase database
* Browse previously generated recipes

### 🎨 Modern UI/UX

* Built with Tailwind CSS
* Interactive recipe cards
* Smooth loading states

---

## 🏗️ System Architecture

Kadh.ai follows a **secure client-server architecture**:

* **Client (Next.js):** Handles UI and user input

* **API Layer (/api/generate):**

  * Prompt engineering
  * Gemini API interaction
  * Nutrition structuring

* **Parallel Processing:**

  * Fetch recipe image (Unsplash)
  * Store data (Supabase)

* **Response Hydration:**

  * Fully structured recipe returned to UI

---

## 🧰 Tech Stack

* **Frontend:** Next.js (React), TypeScript, Tailwind CSS
* **Backend:** Next.js API Routes (Serverless)
* **Database:** Supabase (PostgreSQL)
* **AI Provider:** Google Gemini 1.5 Flash
* **Media:** Unsplash API

---

## 📂 Project Structure

```
Kadh.ai/
├── public/
│   └── kadh-hero.png             # Static assets and images
├── src/
│   ├── app/                      # Next.js App Router (Pages & API)
│   │   ├── api/                  # Serverless API Endpoints
│   │   │   ├── generate/
│   │   │   │   └── route.ts      # Gemini AI integration & Unsplash logic
│   │   │   ├── photo/
│   │   │   │   └── route.ts      # Legacy client-side Unsplash fetching
│   │   │   └── seed/
│   │   │       └── route.ts      # Supabase database seeding script
│   │   ├── find/
│   │   │   └── page.tsx          # Core recipe generation UI & forms
│   │   ├── recipe/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Dynamic individual recipe detail view
│   │   ├── saved/
│   │   │   └── page.tsx          # User's saved community recipes library
│   │   ├── globals.css           # Tailwind CSS configuration & global styles
│   │   ├── layout.tsx            # Root application layout shell
│   │   ├── not-found.tsx         # Custom 404 error page
│   │   └── page.tsx              # Application landing/home page
│   ├── components/               # Reusable React UI Components
│   │   ├── AllergySelector.tsx   # Dietary preference toggles
│   │   ├── IngredientInput.tsx   # Dynamic input for pantry items
│   │   ├── Navbar.tsx            # Global navigation header
│   │   ├── NutritionPanel.tsx    # Macros and health score visualizer
│   │   └── RecipeCard.tsx        # Reusable recipe preview card
│   └── lib/                      # Shared Utilities & Configs
│       └── supabase.ts           # Supabase client and DB helper functions
├── .env.local                    # Secret environment variables (ignored in Git)
├── next.config.mjs               # Next.js framework configuration
├── package.json                  # NPM dependencies and project scripts
├── tailwind.config.ts            # Tailwind design system configuration
└── README.md                     # Project documentation
```

---

## ⚙️ Local Setup

```bash
git clone https://github.com/Anshu-raj-co/Kadh.ai.git
cd Kadh.ai
npm install
```

### Add Environment Variables

```
GEMINI_API_KEY=your_key
UNSPLASH_ACCESS_KEY=your_key
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key
```

```bash
npm run dev
```

---

## 🗺️ Future Roadmap

* [ ] User authentication (Supabase Auth)
* [ ] Grocery list generator
* [ ] AI-based ingredient substitution
* [ ] Personalized recommendations

---

## 👨‍💻 Author

**Anshu Raj**

* GitHub: https://github.com/Anshu-raj-co
* LinkedIn: https://www.linkedin.com/in/anshu-raj-373349287/

---

## ⭐ Final Note

Kadh.ai is designed not just as a recipe generator, but as a **foundation for an intelligent cooking assistant**, combining AI, nutrition, and real-world usability.
