document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.main-header');
    header.classList.add('transparent');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            header.classList.remove('transparent');
        } else {
            header.classList.remove('scrolled');
            header.classList.add('transparent');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mainHeader = document.querySelector('.main-header');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Scroll Animation Trigger
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // Form Submission Handling (without database)
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <div class="success-content">
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you! Your submission has been received.</p>
                </div>
            `;
            
            // Style the success message
            const style = document.createElement('style');
            style.textContent = `
                .form-success {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    animation: fadeIn 0.3s ease;
                }
                .success-content {
                    background-color: white;
                    padding: 30px;
                    border-radius: 10px;
                    text-align: center;
                    max-width: 400px;
                    animation: slideUp 0.5s ease;
                }
                .success-content i {
                    font-size: 3rem;
                    color: #2ecc71;
                    margin-bottom: 20px;
                }
                .success-content p {
                    font-size: 1.2rem;
                    margin-bottom: 0;
                }
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(successMessage);
            
            // Remove after 3 seconds
            setTimeout(() => {
                successMessage.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    successMessage.remove();
                    style.remove();
                }, 300);
            }, 3000);
            
            // Reset form
            this.reset();
        });
    });
    
    // Tour Card Click Handler
    document.querySelectorAll('.tour-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't redirect if clicking on a button or link inside the card
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                return;
            }
            
            // In a real app, you would redirect to the specific tour page
            // For this demo, we'll just go to the generic tour detail page
            window.location.href = 'tour-detail.html';
        });
    });
});

// main.js (add this to your existing code)
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Tour Card Click Handler
    document.querySelectorAll('.tour-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't redirect if clicking on a button or link inside the card
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                return;
            }
            
            // Get the tour ID from data attribute
            const tourId = parseInt(this.dataset.tourId);
            
            // Store the tour ID in localStorage
            localStorage.setItem('selectedTourId', tourId);
            
            // Redirect to tour detail page
            window.location.href = 'tour-detail.html';
        });
    });
});
// Add to your main.js
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Toggle theme
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Rest of your existing JavaScript...
});
// Add to your theme detection in main.js
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');