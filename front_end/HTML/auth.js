// Authentication state management
const AUTH_KEY = 'kadh_ai_auth';
const USER_ID_KEY = 'userId';
const USERNAME_KEY = 'username';

// Check if user is authenticated
function isAuthenticated() {
    return localStorage.getItem(AUTH_KEY) === 'true' && localStorage.getItem(USER_ID_KEY) !== null;
}

// Set authentication state
function setAuthenticated(isAuth, username = null) {
    localStorage.setItem(AUTH_KEY, isAuth);
    if (username) {
        localStorage.setItem(USERNAME_KEY, username);
    }
}

// Get user ID
function getUserId() {
    return localStorage.getItem(USER_ID_KEY);
}

// Get username
function getUsername() {
    return localStorage.getItem(USERNAME_KEY);
}

// Update navigation based on auth state
function updateNavigation() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    if (isAuthenticated()) {
        const username = getUsername();
        navLinks.innerHTML = `
            <a href="homepage.html">Home</a>
            <a href="dashboard.html">Dashboard</a>
            <a href="favorites.html">Favorites</a>
            <a href="categories.html">Categories</a>
            
            <a href="profile.html">${username || 'Profile'}</a>
            <a href="#" onclick="logout()">Logout</a>
        `;
    } else {
        navLinks.innerHTML = `
            <a href="homepage.html">Home</a>
            <a href="categories.html">Categories</a>
           
            <a href="login.html">Login</a>
            <a href="signup.html">Sign Up</a>
        `;
    }

    // Add the styles for navigation
    if (!document.getElementById('nav-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'nav-styles';
        styleSheet.textContent = `
            .nav-links {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .nav-links a {
                color: #555;
                font-size: 16px;
                font-weight: 500;
                text-decoration: none;
                margin: 0 12px;
                transition: color 0.2s ease;
            }
            .nav-links a:hover {
                color: #f8b400;
            }
            @media (max-width: 768px) {
                .nav-links {
                    position: absolute;
                    top: 65px;
                    left: 0;
                    right: 0;
                    background: white;
                    padding: 10px 20px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .nav-links a {
                    margin: 5px 10px;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

// Logout function
function logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USERNAME_KEY);
    window.location.href = 'homepage.html';
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    // If on protected pages and not authenticated, redirect to login
    const protectedPages = ['dashboard.html', 'favorites.html', 'profile.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }
    
    // Update navigation
    updateNavigation();
}); 