import { NextRequest, NextResponse } from 'next/server'

// ── Types ─────────────────────────────────────────────────────────────────────

// Partial shape of the Unsplash /search/photos response we actually use
interface UnsplashPhoto {
  id: string
  urls: {
    raw: string
    full: string
    regular: string  // 1080px wide — the one we return
    small: string
    thumb: string
  }
  alt_description: string | null
  user: {
    name: string
    links: { html: string }
  }
  links: {
    html: string  // Photo page URL (for attribution, required by Unsplash guidelines)
  }
}

interface UnsplashSearchResponse {
  total: number
  total_pages: number
  results: UnsplashPhoto[]
}

// What we return to the client
interface PhotoResponse {
  url: string             // urls.regular — ready to drop into <Image src>
  photographer: string    // Required attribution by Unsplash API guidelines
  photographer_url: string
  photo_page: string      // Link to the photo on Unsplash (also required attribution)
}

// ── Query Sanitisation ────────────────────────────────────────────────────────
// Strip emojis and extra punctuation from recipe titles before sending
// them as a search query. "🍛 Dal Tadka!" → "Dal Tadka food"

function buildSearchQuery(title: string): string {
  const cleaned = title
    .replace(/[\u{1F300}-\u{1FFFF}]/gu, '') // strip emoji
    .replace(/[^\w\s]/g, '')                 // strip punctuation
    .trim()

  // Append "food" to bias Unsplash toward food photography rather than
  // places, people, or abstract images that might share a recipe's name.
  return `${cleaned} food`
}

// ── Fallback Pool ─────────────────────────────────────────────────────────────
// If Unsplash returns zero results (rare), we return a beautiful generic
// food photo rather than crashing or returning an empty string.

const FALLBACK_PHOTOS: PhotoResponse[] = [
  {
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1080',
    photographer: 'Unsplash',
    photographer_url: 'https://unsplash.com',
    photo_page: 'https://unsplash.com',
  },
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1080',
    photographer: 'Unsplash',
    photographer_url: 'https://unsplash.com',
    photo_page: 'https://unsplash.com',
  },
  {
    url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1080',
    photographer: 'Unsplash',
    photographer_url: 'https://unsplash.com',
    photo_page: 'https://unsplash.com',
  },
]

function getRandomFallback(): PhotoResponse {
  return FALLBACK_PHOTOS[Math.floor(Math.random() * FALLBACK_PHOTOS.length)]
}

// ── Route Handler ─────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  // 1. Extract and validate the recipe_title query param
  const { searchParams } = new URL(req.url)
  const recipeTitle = searchParams.get('recipe_title')?.trim()

  if (!recipeTitle) {
    return NextResponse.json(
      { error: 'Missing required query parameter: recipe_title' },
      { status: 400 }
    )
  }

  // 2. Check API key
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  if (!accessKey) {
    console.error('[photo] UNSPLASH_ACCESS_KEY is not set in environment variables.')
    // Don't fail hard — return a fallback so the UI still renders
    return NextResponse.json(getRandomFallback(), { status: 200 })
  }

  // 3. Call Unsplash Search API
  const query = buildSearchQuery(recipeTitle)
  const unsplashUrl = new URL('https://api.unsplash.com/search/photos')
  unsplashUrl.searchParams.set('query', query)
  unsplashUrl.searchParams.set('per_page', '5')       // Fetch 5, pick the best
  unsplashUrl.searchParams.set('orientation', 'landscape') // Better for cards
  unsplashUrl.searchParams.set('content_filter', 'high')   // Safe content only

  try {
    const res = await fetch(unsplashUrl.toString(), {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        'Accept-Version': 'v1',
      },
      // Cache photos for 24 hours — the same recipe title will always
      // resolve to the same photo without hitting the API every time.
      next: { revalidate: 86400 },
    })

    if (!res.ok) {
      console.error(`[photo] Unsplash API responded with ${res.status}`)
      return NextResponse.json(getRandomFallback(), { status: 200 })
    }

    const data = (await res.json()) as UnsplashSearchResponse

    // 4. No results → graceful fallback
    if (!data.results || data.results.length === 0) {
      console.warn(`[photo] No Unsplash results for query: "${query}"`)
      return NextResponse.json(getRandomFallback(), { status: 200 })
    }

    // 5. Pick the first result (Unsplash returns results sorted by relevance)
    const photo = data.results[0]

    const response: PhotoResponse = {
      url: photo.urls.regular,
      photographer: photo.user.name,
      photographer_url: photo.user.links.html,
      photo_page: photo.links.html,
    }

    return NextResponse.json(response, { status: 200 })

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[photo] Fetch error:', message)

    // Always return something usable rather than a 500
    return NextResponse.json(getRandomFallback(), { status: 200 })
  }
}

// Block POST etc.
export async function POST() {
  return NextResponse.json({ error: 'Method not allowed. Use GET.' }, { status: 405 })
}
