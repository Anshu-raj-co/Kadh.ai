# *Kadh.ai*
An intelligent, AI-powered culinary assistant that transforms your available ingredients into structured, macro-balanced recipes.

# *Overview*
Kadh.ai was built to solve the daily "what's for dinner" dilemma while minimizing food waste. By inputting available pantry ingredients, dietary restrictions, and allergies, the application leverages the Gemini AI model to dynamically generate diverse, high-quality recipe options.

Note: This project was originally prototyped in Python/Flask and has been completely re-architected into a modern, full-stack Next.js application.

# *Key Features*
Pantry-to-Plate Generation: Input your current ingredients and let AI generate distinct, actionable recipes.

Strict Dietary Guardrails: Enforces hard constraints for allergies and specific aversions to ensure safe recipe generation.

Granular Nutritional Data: Automatically calculates realistic serving sizes, caloric density, macros (Protein, Carbs, Fat, Fiber), and a proprietary "Health Score."

Dynamic Media Integration: Automatically fetches high-resolution, contextually relevant food photography via the Unsplash API based on the generated recipe title.

Persistent Library: Server-side integration with Supabase allows users to save generated recipes to a community database for future browsing.

Responsive, Modern UI: Built with Tailwind CSS and Lucide React icons, featuring loading state animations and interactive recipe cards.

# *Technical Stack*
Frontend: Next.js (React), Tailwind CSS, TypeScript
Backend: Next.js API Routes (Serverless Functions)
Database: Supabase (PostgreSQL)
AI Provider: Google Generative AI (Gemini 1.5 Flash)
Image Provider: Unsplash API

# *System Architecture*
Kadh.ai utilizes a strict Client-Server architecture to protect API keys and manage database rate limits.
Client: The React frontend collects user parameters and orchestrates UI loading states.
API Route (/api/generate): Intercepts the request, engineers the prompt, and queries the Gemini AI.
Parallel Processing: Once the text is generated, the server simultaneously fetches imagery from Unsplash and executes a Service_Role insert to Supabase.
Hydration: The fully formed, database-backed recipe object is returned to the client for immediate, seamless rendering.

# *Local Development Setup*
1. Clone the repository

Bash
git clone https://github.com/Anshu-raj-co/Kadh.ai.git
cd Kadh.ai

2. Install dependencies

Bash
npm install

3. Configure Environment Variables
Create a .env.local file in the root directory and add your API keys:

Code snippet
# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Unsplash API
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here

# Supabase (Database)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
4. Run the development server

Bash
npm run dev
Open http://localhost:3000 to view the application.

🗺️ Future Roadmap
[ ] Implement user authentication (Supabase Auth) for private recipe libraries.
[ ] Add a "Print Recipe" optimized layout.
[ ] Integrate a grocery list generator based on missing ingredients.

👨‍💻 Author
Anshu Raj
GitHub
LinkedIn (https://www.linkedin.com/in/anshu-raj-373349287/)

## 📂 Project Structure

```text
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
