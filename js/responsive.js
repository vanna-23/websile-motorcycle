/**
 * Responsive Motorcycle Website JavaScript
 * Mobile interactions and responsive functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-top');
    const mobileMenu = document.querySelector('.p-top');
    const menuLinks = document.querySelectorAll('.p-top ul li a');
    const overlay = document.querySelector('.mobile-overlay') || createOverlay();

    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        document.body.appendChild(overlay);
        return overlay;
    }

    if (menuToggle && mobileMenu) {
        // SIMPLE CLICK EVENT - Multiple ways to trigger
        menuToggle.addEventListener('click', toggleMobileMenu);
        menuToggle.addEventListener('touchstart', toggleMobileMenu);
        
        // Also listen on the icon inside
        const menuIcon = menuToggle.querySelector('i');
        if (menuIcon) {
            menuIcon.addEventListener('click', toggleMobileMenu);
        }
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', closeMobileMenu);
        
        // Close menu when clicking a link
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // Touch gesture support
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    });

    function handleSwipeGesture() {
        const swipeThreshold = 100;
        const swipeDistance = touchEndX - touchStartX;

        // Swipe right to open menu (from left edge)
        if (swipeDistance > swipeThreshold && touchStartX < 50) {
            if (!mobileMenu.classList.contains('active')) {
                openMobileMenu();
            }
        }
        
        // Swipe left to close menu
        if (swipeDistance < -swipeThreshold && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }

    function toggleMobileMenu(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        console.log('Menu toggle clicked!'); // Debug log
        
        // SIMPLE TOGGLE - just add/remove active class
        if (mobileMenu.classList.contains('active')) {
            // Close menu
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            console.log('Menu closed');
        } else {
            // Open menu
            mobileMenu.classList.add('active');
            menuToggle.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Menu opened');
        }
        
        // Add haptic feedback for mobile devices
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        menuToggle.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add staggered animation to menu items
        menuLinks.forEach((link, index) => {
            link.style.animationDelay = `${0.1 + (index * 0.1)}s`;
        });
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced Navbar scroll effects
    let lastScrollTop = 0;
    const navbar = document.querySelector('.nav-top');
    
    if (navbar) {
        window.addEventListener('scroll', throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class for enhanced styling
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll (mobile only)
            if (window.innerWidth <= 768) {
                if (scrollTop > lastScrollTop && scrollTop > 150) {
                    // Scrolling down - hide navbar
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up - show navbar
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                // Reset transform for desktop
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        }, 100));
    }

    // Enhanced menu toggle with better animations
    function toggleMobileMenu() {
        const isActive = mobileMenu.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
        
        // Add haptic feedback for mobile devices
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        menuToggle.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset navbar transform when menu opens
        if (navbar) {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add menu footer if it doesn't exist
        if (!mobileMenu.querySelector('.menu-footer')) {
            const menuFooter = document.createElement('div');
            menuFooter.className = 'menu-footer';
            mobileMenu.appendChild(menuFooter);
        }
        
        // Add staggered animation to menu items with enhanced timing
        menuLinks.forEach((link, index) => {
            link.style.animationDelay = `${0.1 + (index * 0.1)}s`;
            link.style.animationDuration = '0.7s';
        });
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset animation delays
        menuLinks.forEach(link => {
            link.style.animationDelay = '';
            link.style.animationDuration = '';
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-homepage-sentance, .services-pag-sentact, .gallery-paragap, .clients-image, .featured-bikes-paragrap');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Image lazy loading
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
        // Set opacity to 1 immediately if image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Responsive iframe handling
    function makeIframesResponsive() {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
            wrapper.style.height = '0';
            wrapper.style.overflow = 'hidden';
            
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            
            iframe.parentNode.insertBefore(wrapper, iframe);
            wrapper.appendChild(iframe);
        });
    }

    // Apply responsive iframe handling on mobile
    if (window.innerWidth <= 768) {
        makeIframesResponsive();
    }

    // Handle window resize
    window.addEventListener('resize', throttle(function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            closeMobileMenu();
            // Reset navbar transform
            if (navbar) {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        // Re-apply iframe responsiveness
        if (window.innerWidth <= 768) {
            makeIframesResponsive();
        }
    }, 250));

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
        
        // Open mobile menu with Enter/Space on menu toggle
        if ((e.key === 'Enter' || e.key === ' ') && e.target === menuToggle) {
            e.preventDefault();
            toggleMobileMenu();
        }
    });

    // Focus management for mobile menu
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // Apply focus trapping to mobile menu
    if (mobileMenu) {
        trapFocus(mobileMenu);
    }

    // Performance optimization: Throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Add loading class removal after page load
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove any loading animations
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(el => {
            el.classList.remove('loading');
        });
    });

    // Add touch-friendly hover effects for mobile
    if ('ontouchstart' in window) {
        const hoverElements = document.querySelectorAll('.clients-image, .contact-company div, .home-readmore, .about-home-sentance-btn, .services-pag-btn, .gallery-paragap-btn, .clients-btn');
        
        hoverElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            el.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
    }

    console.log('Responsive motorcycle website initialized successfully!');
});

// CSS for touch-active state
const touchStyles = document.createElement('style');
touchStyles.textContent = `
    .touch-active {
        transform: scale(0.98) !important;
        transition: transform 0.1s ease !important;
    }
`;
document.head.appendChild(touchStyles);
