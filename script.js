// ========================================
// LUXORA APPS - JavaScript Effects
// ========================================

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initParallaxEffect();
    initActiveNavigation();
    initMouseMovementEffect();
    // initFormValidation();  // Removed as contact form is removed
    initScrollProgressBar();
    initInteractiveElements();
});

// ========================================
// 1. SCROLL REVEAL ANIMATION
// ========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.app-card, .feature-item, .info-item, .footer-section');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
     // Set initial state
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Listen to scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Call once on load
}

// ========================================
// 2. PARALLAX EFFECT ON SCROLL
// ========================================
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        document.querySelectorAll('.apps-section').forEach(section => {
            section.style.backgroundPosition = `center ${scrollY * 0.5}px`;
        });
        
        document.querySelectorAll('.contact-section').forEach(section => {
            section.style.backgroundPosition = `center ${scrollY * 0.5}px`;
        });
    });
}

// ========================================
// 3. ACTIVE NAVIGATION HIGHLIGHTING
// ========================================
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-links');
    const sections = document.querySelectorAll('[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.borderBottom = 'none';
            link.style.color = '#0a0a0a';
        });
        
        if (current) {
            const activeLink = document.querySelector(`a[href="#${current}"]`);
            if (activeLink) {
                activeLink.style.borderBottom = '3px solid #d4af37';
                activeLink.style.transition = 'all 0.3s ease';
            }
        }
    });
}

// ========================================
// 4. MOUSE MOVEMENT EFFECT ON CARDS
// ========================================
function initMouseMovementEffect() {
    const cards = document.querySelectorAll('.app-card, .feature-item, .info-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            card.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.transition = 'all 0.3s ease';
        });
    });
}

// ========================================
// 5. FORM VALIDATION WITH FEEDBACK - REMOVED
// ========================================
// Form validation removed as contact form has been replaced with WhatsApp

// ========================================
// 6. SCROLL PROGRESS INDICATOR
// ========================================
function initScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%)';
    progressBar.style.zIndex = '9998';
    progressBar.style.transition = 'width 0.1s ease';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercentage + '%';
    });
}

// ========================================
// 7. INTERACTIVE ELEMENTS
// ========================================
function initInteractiveElements() {
    // Ripple effect on buttons and links
    addRippleEffect();
    
    // Counter animation for stats
    animateCounters();
    
    // Smooth link navigation
    addSmoothNavigation();
}

// Ripple effect
function addRippleEffect() {
    const buttons = document.querySelectorAll('button, .support-link, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'rippleAnimation 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 50);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 50);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        
        observer.observe(counter);
    });
}

// Smooth navigation
function addSmoothNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// UTILITY: Add keyframe animations dynamically
// ========================================
function addKeyframeAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @keyframes rippleAnimation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize keyframes
addKeyframeAnimations();

// ========================================
// BONUS: Mouse cursor glow effect
// ========================================
function initMouseCursorGlow() {
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '30px';
    cursor.style.height = '30px';
    cursor.style.borderRadius = '50%';
    cursor.style.border = '2px solid #d4af37';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '10000';
    cursor.style.opacity = '0.5';
    cursor.style.display = 'none';
    cursor.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.5)';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = (e.clientX - 15) + 'px';
        cursor.style.top = (e.clientY - 15) + 'px';
        cursor.style.display = 'block';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });
}

// Uncomment the line below if you want the cursor glow effect
// initMouseCursorGlow();

// ========================================
// PERFORMANCE: Debounce function for scroll events
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

console.log('✨ Luxora Apps - JavaScript Effects Loaded!');