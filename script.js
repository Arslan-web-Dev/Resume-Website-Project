/**
 * Obsidian Premium Portfolio
 * Advanced Interactivity & Motion Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initMagneticElements();
    initScrollAnimations();
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initScrollProgress();
});

/**
 * Custom Cursor Logic
 * Smooth lagging follower using requestAnimationFrame
 */
function initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    
    if (!dot || !outline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dot follows immediately
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    const animate = () => {
        // Outline follows with lerp (linear interpolation)
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        outline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px)`;
        
        requestAnimationFrame(animate);
    };
    animate();

    // Hover effects for interactive elements
    const targets = document.querySelectorAll('a, button, .bento-card, .project-card-premium');
    targets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.style.transform += ' scale(1.5)';
            outline.style.borderColor = 'var(--primary)';
            dot.style.transform += ' scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            outline.style.transform = outline.style.transform.replace(' scale(1.5)', '');
            outline.style.borderColor = 'var(--accent)';
            dot.style.transform = dot.style.transform.replace(' scale(0.5)', '');
        });
    });
}

/**
 * Magnetic Elements Logic
 * Makes elements "pull" toward the cursor
 */
function initMagneticElements() {
    const magnetics = document.querySelectorAll('.btn-circle, .btn-primary, .btn-secondary, .social-icon');
    
    magnetics.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0, 0)`;
        });
    });
}

/**
 * Scroll Progress Bar
 */
function initScrollProgress() {
    const progress = document.getElementById('scroll-progress');
    if (!progress) return;

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progress.style.width = scrolled + "%";
    });
}

/**
 * Scroll Reveal Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    if (!toggle) return;

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.checked = false;
        });
    });
}

/**
 * Smooth Scrolling
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Contact Form Logic
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Your architectural vision has been received. I will reach out shortly.');
            form.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });
}
