let currentSection = 'dashboard';
let darkMode = false;
let notifications = [];
let orders = [];
let menuItems = [];
// Redirect to login page
function redirectToLogin() {
    window.location.href = 'login.html';
}
// Login Page Functions
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.password-toggle i');   
    if (passwordInput && toggleBtn) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleBtn.className = 'fas fa-eye-slash';
        } else {
            passwordInput.type = 'password';
            toggleBtn.className = 'fas fa-eye';
        }
    }
}
// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Password validation
function isValidPassword(password) {
    // At least 6 characters
    return password.length >= 6;
}
// Show field error
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;    
    const formGroup = field.parentElement;    
    // Add error class
    formGroup.classList.add('error');    
    // Create or update error message
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
}
// Clear all errors
function clearErrors() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}
// Handle form validation
function validateLoginForm() {
    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value;
    // Clear previous errors
    clearErrors();
    let isValid = true;   
    // Email validation
    if (!email) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }    
    // Password validation
    if (!password) {
        showFieldError('password', 'Password is required');
        isValid = false;
    } else if (!isValidPassword(password)) {
        showFieldError('password', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    return isValid;
}
// Handle login form submission
function handleLoginForm() {
    if (!validateLoginForm()) {
        return false;
    }
    
    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value;
    const remember = document.getElementById('remember')?.checked;
    
    // Show success message
    showNotification('Form is valid! Ready for backend processing.', 'success');
    
    // Return form data for backend processing
    return {
        email: email,
        password: password,
        remember: remember
    };
}

// Initialize login page functionality
function initLoginPage() {
    // Add form submission handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = handleLoginForm();
            if (formData) {
                // Form is valid - you can handle the data here
                console.log('Form data ready for backend:', formData);
                // You can add your backend integration here
            }
        });
    }

    // Add interactive effects for login page
    const inputs = document.querySelectorAll('.login-container input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Clear error on input
        input.addEventListener('input', function() {
            const formGroup = this.parentElement;
            if (formGroup.classList.contains('error')) {
                formGroup.classList.remove('error');
                const errorMessage = formGroup.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    });

    // Add hover effects to social buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add back-to-home button functionality
    const backToHomeBtn = document.querySelector('.back-to-home-btn');
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadSampleData();
    startRealTimeUpdates();
    
    // Additional initialization for menu page
    if (window.location.pathname.includes('menu.html')) {
        console.log('Menu page detected, initializing menu functionality...');
        // Ensure all menu items are visible initially
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.style.display = 'block';
            item.style.opacity = '1';
        });
        
        // Initialize category filtering
        const allButton = document.querySelector('.category-btn[data-category="all"]');
        if (allButton) {
            allButton.classList.add('active');
            filterMenuItems('all');
        }
    }
    
    // Additional initialization for orders page
    if (window.location.pathname.includes('orders.html')) {
        console.log('Orders page detected, initializing orders functionality...');
        // Ensure orders table is visible
        const ordersTable = document.querySelector('.orders-table');
        if (ordersTable) {
            ordersTable.style.display = 'block';
        }
    }
    
    // Additional initialization for login page
    if (window.location.pathname.includes('login.html')) {
        console.log('Login page detected, initializing login functionality...');
        initLoginPage();
    }
    
    // Additional initialization for signup page
    if (window.location.pathname.includes('signup')) {
        console.log('Signup page detected, initializing signup functionality...');
        initSignupPage();
    }

    // Signup form handler (no validation, just log data)
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                password: document.getElementById('password').value,
                confirmPassword: document.getElementById('confirmPassword').value,
                terms: document.getElementById('terms').checked,
                newsletter: document.getElementById('newsletter').checked
            };
            console.log('Signup form data:', formData);
        });
    }
});

// Initialize the application
function initializeApp() {
    // Hide loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
    
    // Determine current page and show appropriate section
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    if (currentPage === 'index' || currentPage === '') {
        showSection('dashboard');
    } else if (currentPage === 'orders') {
        showSection('orders');
    } else if (currentPage === 'menu') {
        showSection('menu');
    } else {
        showSection('dashboard');
    }
    
    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        toggleDarkMode();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Navigation - Allow normal navigation for multi-page setup
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        // Only prevent default for same-page navigation
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const section = this.getAttribute('href').substring(1);
                showSection(section);
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        }
    });
    
    // Search functionality
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
        searchInput.addEventListener('input', handleGlobalSearch);
    }
    
    // Category filters
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterMenuItems(this.dataset.category);
        });
    });
    
    // Initialize menu filtering if on menu page
    if (document.querySelector('.menu-categories')) {
        // Show all items initially
        filterMenuItems('all');
    }
}

// Show section with improved visibility
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px) scale(0.98)';
        section.style.zIndex = '1';
    });
    
    // Show selected section with animation
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        targetSection.style.zIndex = '2';
        
        // Force a reflow before adding animation
        targetSection.offsetHeight;
        
        setTimeout(() => {
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0) scale(1)';
        }, 50);
        
        currentSection = sectionName;
        updatePageTitle(sectionName);
        
        // If it's the menu section, ensure all items are visible initially
        if (sectionName === 'menu') {
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                item.style.display = 'block';
            });
        }
    } else {
        // If section doesn't exist on current page, it might be on a different page
        console.log(`Section ${sectionName} not found on current page`);
    }
}

// Update page title
function updatePageTitle(section) {
    const titles = {
        'dashboard': 'Dashboard - Coffee Haven',
        'orders': 'Order Management - Coffee Haven',
        'menu': 'Menu Management - Coffee Haven',
        'inventory': 'Inventory Management - Coffee Haven',
        'employees': 'Staff Management - Coffee Haven',
        'analytics': 'Analytics - Coffee Haven'
    };
    
    document.title = titles[section] || 'Coffee Haven';
}

// Toggle dark mode
function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    
    const icon = document.querySelector('#dark-mode-toggle i');
    if (icon) {
        icon.className = darkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Handle global search
function handleGlobalSearch(event) {
    const query = event.target.value.toLowerCase();
    
    if (query.length < 2) return;
    
    const results = [];
    
    // Search in different sections
    orders.forEach(order => {
        if (order.customer.toLowerCase().includes(query) || 
            order.items.toLowerCase().includes(query)) {
            results.push({ type: 'order', data: order });
        }
    });
    
    menuItems.forEach(item => {
        if (item.name.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query)) {
            results.push({ type: 'menu', data: item });
        }
    });
    
    // Show search results
    showSearchResults(results, query);
}

// Show search results
function showSearchResults(results, query) {
    if (results.length === 0) {
        showNotification(`No results found for "${query}"`, 'warning');
        return;
    }
    
    // Create search results modal
    const modalContent = `
        <div class="search-results">
            <h3>Search Results for "${query}"</h3>
            <div class="results-list">
                ${results.map(result => `
                    <div class="result-item" onclick="handleSearchResult('${result.type}', ${JSON.stringify(result.data).replace(/"/g, '&quot;')})">
                        <i class="fas fa-${result.type === 'order' ? 'shopping-cart' : 'utensils'}"></i>
                        <div class="result-info">
                            <h4>${result.data.name || result.data.customer}</h4>
                            <p>${result.data.description || result.data.items}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    openModal('search-results', 'Search Results', modalContent);
}

// Handle search result selection
function handleSearchResult(type, data) {
    closeModal();
    
    if (type === 'order') {
        showSection('orders');
        // Highlight the order in the table
        highlightOrder(data.id);
    } else if (type === 'menu') {
        showSection('menu');
        // Highlight the menu item
        highlightMenuItem(data.id);
    }
}

// Load sample data
function loadSampleData() {
    // Sample orders
    orders = [
        {
            id: '1001',
            customer: 'John Doe',
            items: 'Premium Blend x2',
            total: '₹1,080',
            status: 'completed',
            time: '2 min ago'
        },
        {
            id: '1002',
            customer: 'Jane Smith',
            items: 'Dark Roast x1',
            total: '₹500',
            status: 'pending',
            time: '5 min ago'
        },
        {
            id: '1003',
            customer: 'Mike Johnson',
            items: 'Vienna Roast x3',
            total: '₹1,500',
            status: 'completed',
            time: '10 min ago'
        }
    ];
    
    // Sample menu items
    menuItems = [
        {
            id: '1',
            name: 'Premium Blend',
            description: 'Rich, Bold, Smooth',
            price: '₹540',
            category: 'coffee',
            image: 'https://via.placeholder.com/300x200/8B4513/FFFFFF?text=Premium+Blend'
        },
        {
            id: '2',
            name: 'Dark Roast',
            description: 'Strong, Cocoa, Bitter Sweet',
            price: '₹500',
            category: 'coffee',
            image: 'https://via.placeholder.com/300x200/654321/FFFFFF?text=Dark+Roast'
        },
        {
            id: '3',
            name: 'Vienna Roast',
            description: 'Cocoa, Oaky, Bitter Sweet',
            price: '₹500',
            category: 'coffee',
            image: 'https://via.placeholder.com/300x200/8B7355/FFFFFF?text=Vienna+Roast'
        },
        {
            id: '4',
            name: 'Cafe Blend',
            description: 'Hazelnut, Honey, Grapes',
            price: '₹540',
            category: 'coffee',
            image: 'https://via.placeholder.com/300x200/A0522D/FFFFFF?text=Cafe+Blend'
        }
    ];
    
    // Populate data
    populateOrdersTable();
    populateMenuGrid();
}

// Populate orders table
function populateOrdersTable() {
    const tbody = document.querySelector('#orders-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.items}</td>
            <td>${order.total}</td>
            <td><span class="status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
            <td>${order.time}</td>
            <td><button class="btn-small" onclick="viewOrder('${order.id}')">View</button></td>
        </tr>
    `).join('');
}

// Populate menu grid
function populateMenuGrid() {
    const menuGrid = document.getElementById('menu-grid');
    if (!menuGrid) return;
    
    menuGrid.innerHTML = menuItems.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <div class="menu-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="menu-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-price">${item.price}</div>
                <button class="btn-primary" onclick="addToMenu('${item.id}')">Add to Menu</button>
            </div>
        </div>
    `).join('');
}

// Filter menu items
function filterMenuItems(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    console.log(`Filtering menu items for category: ${category}`);
    console.log(`Found ${menuItems.length} menu items`);
    
    menuItems.forEach(item => {
        const itemCategory = item.dataset.category;
        console.log(`Item category: ${itemCategory}, Target category: ${category}`);
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.animation = 'fadeIn 0.3s ease-out';
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
        }
    });
}

// Start real-time updates
function startRealTimeUpdates() {
    // Update stats every 30 seconds
    setInterval(updateStats, 30000);
    
    // Add random activity every 2 minutes
    setInterval(addRandomActivity, 120000);
}

// Update stats
function updateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        // Add subtle animation
        stat.style.transform = 'scale(1.05)';
        setTimeout(() => {
            stat.style.transform = 'scale(1)';
        }, 200);
    });
}

// Add random activity
function addRandomActivity() {
    const activities = [
        'New order received',
        'Inventory updated',
        'Staff member logged in',
        'Payment processed'
    ];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    showNotification(randomActivity, 'info');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const container = document.getElementById('notification-container');
    if (container) {
        container.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                container.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// Show toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    const container = document.getElementById('toast-container');
    if (container) {
        container.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideUp 0.3s ease reverse';
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Open modal
function openModal(id, title, content) {
    const modal = document.querySelector('.modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (modal && modalTitle && modalBody) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.style.display = 'flex';
        
        // Add entrance animation
        modal.style.animation = 'fadeIn 0.3s ease';
    }
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.display = 'none';
    }
}

// View order details
function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        const content = `
            <div class="order-details">
                <h3>Order #${order.id}</h3>
                <div class="detail-row">
                    <strong>Customer:</strong> ${order.customer}
                </div>
                <div class="detail-row">
                    <strong>Items:</strong> ${order.items}
                </div>
                <div class="detail-row">
                    <strong>Total:</strong> ${order.total}
                </div>
                <div class="detail-row">
                    <strong>Status:</strong> <span class="status ${order.status}">${order.status}</span>
                </div>
                <div class="detail-row">
                    <strong>Time:</strong> ${order.time}
                </div>
            </div>
        `;
        
        openModal('order-details', `Order #${order.id}`, content);
    }
}

// Add to menu
function addToMenu(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (item) {
        showToast(`${item.name} added to menu successfully`, 'success');
    }
}

// Highlight order in table
function highlightOrder(orderId) {
    const rows = document.querySelectorAll('#orders-tbody tr');
    rows.forEach(row => {
        if (row.cells[0].textContent.includes(orderId)) {
            row.style.backgroundColor = 'rgba(30, 57, 50, 0.1)';
            setTimeout(() => {
                row.style.backgroundColor = '';
            }, 3000);
        }
    });
}

// Highlight menu item
function highlightMenuItem(itemId) {
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
        if (item.dataset.id === itemId) {
            item.style.transform = 'scale(1.05)';
            item.style.boxShadow = '0 10px 30px rgba(30, 57, 50, 0.3)';
            setTimeout(() => {
                item.style.transform = '';
                item.style.boxShadow = '';
            }, 3000);
        }
    });
}

// Export data functions
function exportOrders() {
    showNotification('Orders exported successfully', 'success');
}

function exportMenu() {
    showNotification('Menu exported successfully', 'success');
}

function exportAnalytics() {
    showNotification('Analytics data exported successfully', 'success');
}

// Generate report
function generateReport() {
    showNotification('Report generated successfully', 'success');
}

// Action functions
function viewAllOrders() {
    showSection('orders');
}

function refreshDashboard() {
    showNotification('Dashboard refreshed', 'success');
}

function exportDashboard() {
    showNotification('Dashboard exported successfully', 'success');
}

// Bulk actions
function bulkAction(action) {
    showNotification(`${action} action completed`, 'success');
}

function selectAllOrders() {
    showNotification('All orders selected', 'info');
}

function deselectAllOrders() {
    showNotification('All orders deselected', 'info');
}

function clearFilters() {
    showNotification('Filters cleared', 'info');
}

// Backup and restore functions
function backupData() {
    showNotification('Data backup completed', 'success');
}

function restoreData() {
    showNotification('Data restored successfully', 'success');
}

function exportAllData() {
    showNotification('All data exported successfully', 'success');
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.querySelector('.modal-overlay');
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .search-results {
        max-height: 400px;
        overflow-y: auto;
    }
    
    .result-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid #e9ecef;
    }
    
    .result-item:hover {
        background: #f8f9fa;
        transform: translateX(5px);
    }
    
    .result-item i {
        color: #1e3932;
        font-size: 20px;
    }
    
    .result-info h4 {
        margin: 0 0 5px 0;
        color: #1e3932;
    }
    
    .result-info p {
        margin: 0;
        color: #8d6e63;
        font-size: 14px;
    }
    
    .order-details {
        padding: 20px;
    }
    
    .detail-row {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #e9ecef;
    }
    
    .detail-row:last-child {
        border-bottom: none;
    }
`;
document.head.appendChild(style);

// Signup Page Functions
// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = passwordInput.nextElementSibling;
    const icon = toggleBtn.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Toggle confirm password visibility
function toggleConfirmPassword() {
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const toggleBtn = confirmPasswordInput.nextElementSibling;
    const icon = toggleBtn.querySelector('i');
    
    if (confirmPasswordInput.type === 'password') {
        confirmPasswordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        confirmPasswordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Signup form validation
function validateSignupForm() {
    const firstName = document.getElementById('firstName')?.value.trim();
    const lastName = document.getElementById('lastName')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    const terms = document.getElementById('terms')?.checked;
    
    // Clear previous errors
    clearErrors();
    
    let isValid = true;
    
    // First Name validation
    if (!firstName) {
        showFieldError('firstName', 'First name is required');
        isValid = false;
    }
    
    // Last Name validation
    if (!lastName) {
        showFieldError('lastName', 'Last name is required');
        isValid = false;
    }
    
    // Email validation
    if (!email) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation
    if (!phone) {
        showFieldError('phone', 'Phone number is required');
        isValid = false;
    }
    
    // Password validation
    if (!password) {
        showFieldError('password', 'Password is required');
        isValid = false;
    } else if (!isValidPassword(password)) {
        showFieldError('password', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    // Confirm Password validation
    if (!confirmPassword) {
        showFieldError('confirmPassword', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showFieldError('confirmPassword', 'Passwords do not match');
        isValid = false;
    }
    
    // Terms validation
    if (!terms) {
        showFieldError('terms', 'You must agree to the Terms & Conditions');
        isValid = false;
    }
    
    return isValid;
}

// Handle signup form submission
function handleSignupForm() {
    if (!validateSignupForm()) {
        return false;
    }
    
    const formData = {
        firstName: document.getElementById('firstName')?.value.trim(),
        lastName: document.getElementById('lastName')?.value.trim(),
        email: document.getElementById('email')?.value.trim(),
        phone: document.getElementById('phone')?.value.trim(),
        password: document.getElementById('password')?.value,
        newsletter: document.getElementById('newsletter')?.checked
    };
    
    // Show success message
    showNotification('Account created successfully!', 'success');
    
    // Return form data for backend processing
    return formData;
}

// Initialize signup page functionality
function initSignupPage() {
    // Add form submission handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = handleSignupForm();
            if (formData) {
                // Form is valid - you can handle the data here
                console.log('Signup form data ready for backend:', formData);
                // You can add your backend integration here
            }
        });
    }

    // Add interactive effects for signup page
    const inputs = document.querySelectorAll('.login-container input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Clear error on input
        input.addEventListener('input', function() {
            const formGroup = this.parentElement;
            if (formGroup.classList.contains('error')) {
                formGroup.classList.remove('error');
                const errorMessage = formGroup.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    });

    // Add hover effects to social buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add back-to-home button functionality
    const backToHomeBtn = document.querySelector('.back-to-home-btn');
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
}