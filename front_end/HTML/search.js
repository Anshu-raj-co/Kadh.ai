// API endpoint configuration
const API_BASE_URL = 'http://localhost:5000';

// Minimum characters required for search
const MIN_SEARCH_CHARS = 2;

// Search functionality
async function searchRecipes(query, activeFilters = []) {
    const resultsContainer = document.querySelector('.search-results');
    if (!resultsContainer) {
        console.error('Results container not found');
        return;
    }

    // Don't search if query is too short (unless we have active filters)
    if (query && query.length < MIN_SEARCH_CHARS && activeFilters.length === 0) {
        resultsContainer.innerHTML = `
            <div class="info-message">
                <p>Please enter at least ${MIN_SEARCH_CHARS} characters to search</p>
            </div>
        `;
        return;
    }

    // Show loading state with minimum height to prevent layout shift
    resultsContainer.innerHTML = `
        <div class="loading" style="min-height: 400px;">
            <div class="loading-spinner"></div>
            <p>Searching for recipes...</p>
        </div>
    `;

    try {
        // Build URL with search parameters
        const params = new URLSearchParams();
        if (query) params.set('q', query);
        if (activeFilters.length > 0) params.set('categories', activeFilters.join(','));
        
        // Make API call with retry logic
        let retries = 3;
        let response;
        
        while (retries > 0) {
            try {
                response = await fetch(`${API_BASE_URL}/api/recipes/search?${params.toString()}`);
                if (response.ok) break;
                retries--;
                if (retries > 0) await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (err) {
                console.error('Fetch attempt failed:', err);
                retries--;
                if (retries === 0) throw err;
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        if (!response.ok) {
            throw new Error(`Search request failed: ${response.status} ${response.statusText}`);
        }

        const results = await response.json();
        
        // If no results but we have filters, suggest removing filters
        if ((!results || results.length === 0) && activeFilters.length > 0) {
            resultsContainer.innerHTML = `
                <div class="no-results" style="min-height: 200px;">
                    <p>No recipes found matching your search with the selected filters.</p>
                    <p>Try removing some filters or using different search terms.</p>
                    <button onclick="clearFilters()" class="clear-filters-btn">Clear All Filters</button>
                </div>
            `;
            return;
        }
        
        displayResults(results);
    } catch (error) {
        console.error('Search error:', error);
        resultsContainer.innerHTML = `
            <div class="error" style="min-height: 200px;">
                <p>Sorry, something went wrong while searching for recipes.</p>
                <p>Please try again later.</p>
                <button onclick="retryLastSearch()" class="retry-button">Retry Search</button>
            </div>
        `;
    }
}

// Clear all filters
function clearFilters() {
    const filterButtons = document.querySelectorAll('.category-btn');
    filterButtons.forEach(button => button.classList.remove('active'));
    lastActiveFilters = [];
    searchRecipes(lastSearchQuery, []);
}

// Store last search parameters for retry functionality
let lastSearchQuery = '';
let lastActiveFilters = [];
let searchTimeout = null;

// Function to retry last search
function retryLastSearch() {
    searchRecipes(lastSearchQuery, lastActiveFilters);
}

// Display search results
function displayResults(results) {
    const resultsContainer = document.querySelector('.search-results');
    
    if (!resultsContainer) {
        console.error('Results container not found');
        return;
    }
    
    if (!results || results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results" style="min-height: 200px;">
                <p>No recipes found matching your search.</p>
                <p>Try different search terms or check our popular categories below:</p>
                <div class="suggested-categories">
                    <button onclick="searchCategory('Chicken')" class="suggestion-btn">Chicken Recipes</button>
                    <button onclick="searchCategory('Pasta')" class="suggestion-btn">Pasta Dishes</button>
                    <button onclick="searchCategory('Vegetarian')" class="suggestion-btn">Vegetarian Meals</button>
                </div>
            </div>
        `;
        return;
    }

    // Create a container for the grid
    const gridContainer = document.createElement('div');
    gridContainer.className = 'results-grid';
    
    // Set minimum height to prevent layout shifts
    const minHeight = Math.min(results.length * 100, 400);
    gridContainer.style.minHeight = `${minHeight}px`;

    // Preload images before displaying them
    const imagePromises = results.map(recipe => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(recipe);
            img.onerror = () => {
                recipe.image_url = 'default-recipe.jpg';
                resolve(recipe);
            };
            img.src = recipe.image_url || 'default-recipe.jpg';
        });
    });

    // Show loading state while images are loading
    resultsContainer.innerHTML = `
        <div class="loading" style="min-height: ${minHeight}px">
            <div class="loading-spinner"></div>
            <p>Loading recipes...</p>
        </div>
    `;

    // Wait for all images to load or fail
    Promise.all(imagePromises).then(loadedResults => {
        gridContainer.innerHTML = loadedResults.map(recipe => `
            <div class="recipe-card" onclick="showRecipeDetails('${recipe.id}')">
                <div class="recipe-image-container">
                    <img src="${recipe.image_url}" alt="${recipe.title}" 
                         loading="lazy"
                         class="recipe-image">
                </div>
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <p class="recipe-description">${recipe.description || ''}</p>
                    <div class="recipe-meta">
                        <div class="meta-row">
                            ${recipe.prep_time ? `
                                <span title="Preparation Time">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M12 6v6l4 2"/>
                                    </svg>
                                    ${recipe.prep_time}
                                </span>
                            ` : ''}
                            ${recipe.cook_time ? `
                                <span title="Cooking Time">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M15 8a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        <path d="M12 2v2m0 16v2M4 12H2"/>
                                    </svg>
                                    ${recipe.cook_time}
                                </span>
                            ` : ''}
                        </div>
                        <div class="meta-row">
                            ${recipe.difficulty ? `
                                <span title="Difficulty">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M3 12h18M3 6h18M3 18h18"/>
                                    </svg>
                                    ${recipe.difficulty}
                                </span>
                            ` : ''}
                            ${recipe.cuisine ? `
                                <span title="Cuisine">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2z"/>
                                    </svg>
                                    ${recipe.cuisine}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Replace loading state with results
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(gridContainer);
    });
}

// Search by category
function searchCategory(category) {
    const filterButtons = document.querySelectorAll('.category-btn');
    filterButtons.forEach(button => {
        if (button.dataset.category === category) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    lastActiveFilters = [category];
    searchRecipes('', [category]);
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const filterButtons = document.querySelectorAll('.category-btn');
    
    // Debounce function with proper cleanup
    function debounce(func, wait) {
        return function executedFunction(...args) {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            searchTimeout = setTimeout(() => {
                func.apply(this, args);
                searchTimeout = null;
            }, wait);
        };
    }
    
    // Store active filters
    let activeFilters = [];
    
    // Initialize filters with smooth transitions
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const category = button.dataset.category;
            
            if (button.classList.contains('active')) {
                activeFilters.push(category);
            } else {
                activeFilters = activeFilters.filter(filter => filter !== category);
            }
            
            // Store current search state
            lastSearchQuery = searchInput.value;
            lastActiveFilters = [...activeFilters];
            
            // Perform search with current input and filters
            searchRecipes(searchInput.value, activeFilters);
        });
    });
    
    // Handle search input with improved debounce
    const debouncedSearch = debounce((value) => {
        lastSearchQuery = value;
        lastActiveFilters = [...activeFilters];
        searchRecipes(value, activeFilters);
    }, 500); // Increased debounce time to reduce jitter
    
    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });
    
    // Handle search button click
    searchButton.addEventListener('click', () => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
            searchTimeout = null;
        }
        lastSearchQuery = searchInput.value;
        lastActiveFilters = [...activeFilters];
        searchRecipes(searchInput.value, activeFilters);
    });
    
    // Handle form submission
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (searchTimeout) {
                clearTimeout(searchTimeout);
                searchTimeout = null;
            }
            lastSearchQuery = searchInput.value;
            lastActiveFilters = [...activeFilters];
            searchRecipes(searchInput.value, activeFilters);
        });
    }
});

// Add necessary styles
const style = document.createElement('style');
style.textContent = `
    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 24px;
        padding: 24px;
        max-width: 1400px;
        margin: 0 auto;
    }

    .recipe-card {
        background: white;
        border-radius: 16px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        overflow: hidden;
        min-height: 420px;
    }

    .recipe-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }

    .recipe-image-container {
        width: 100%;
        height: 200px;
        position: relative;
        background: #f5f5f5;
        overflow: hidden;
    }

    .recipe-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .recipe-card:hover .recipe-image {
        transform: scale(1.05);
    }

    .recipe-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 20px;
        gap: 16px;
    }

    .recipe-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #2d3436;
        margin: 0;
        line-height: 1.4;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .recipe-description {
        font-size: 0.95rem;
        color: #636e72;
        line-height: 1.5;
        flex-grow: 1;
        margin: 0;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .recipe-meta {
        margin-top: auto;
        padding-top: 16px;
        border-top: 1px solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .meta-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
    }

    .recipe-meta span {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 0.875rem;
        line-height: 1;
        white-space: nowrap;
    }

    /* Time tags */
    .recipe-meta span[title^="Preparation"],
    .recipe-meta span[title^="Cooking"] {
        background-color: #e8f5e9;
        color: #2e7d32;
    }

    /* Difficulty tag */
    .recipe-meta span[title="Difficulty"] {
        background-color: #fff3e0;
        color: #f57c00;
    }

    /* Cuisine tag */
    .recipe-meta span[title="Cuisine"] {
        background-color: #e3f2fd;
        color: #1976d2;
        grid-column: 1 / -1;
    }

    .recipe-meta svg {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
    }

    @media (max-width: 1200px) {
        .results-grid {
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        }
    }

    @media (max-width: 768px) {
        .results-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 16px;
        }

        .recipe-card {
            min-height: 380px;
        }

        .recipe-image-container {
            height: 180px;
        }
    }

    /* Loading state */
    .loading {
        grid-column: 1 / -1;
        text-align: center;
        padding: 40px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    }

    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #f0f0f0;
        border-top: 3px solid #f8b400;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 16px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style); 