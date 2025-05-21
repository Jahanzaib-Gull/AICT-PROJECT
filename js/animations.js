// Additional animations that can be added to elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover class to elements that should have hover effects
    const hoverElements = document.querySelectorAll('.btn, .tour-card, .gallery-item, .social-links a');
    
    hoverElements.forEach(element => {
        element.classList.add('hover-effect');
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.classList.add('btn-hover-effect');
    });
    
    // Add card hover effect
    const cards = document.querySelectorAll('.tour-card, .gallery-item');
    
    cards.forEach(card => {
        card.classList.add('card-hover-effect');
    });
    
    // Landing page animation sequence
    if (document.querySelector('.hero-content')) {
        const heroContent = document.querySelector('.hero-content');
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Animate elements with delay
    const delayElements = document.querySelectorAll('[class*="delay-"]');
    
    delayElements.forEach(element => {
        const classes = element.className.split(' ');
        const delayClass = classes.find(cls => cls.startsWith('delay-'));
        
        if (delayClass) {
            const delay = delayClass.split('-')[1];
            element.style.transitionDelay = `${delay * 0.1}s`;
        }
    });
});