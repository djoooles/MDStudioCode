// Mobile menu toggle
document.querySelector('.mobile-menu')?.addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('nav ul').classList.toggle('show');
});

// Close menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('nav ul').classList.remove('show');
        document.querySelector('.mobile-menu').classList.remove('active');
    });
});

// Logo animation
document.querySelector('.logo')?.addEventListener('mouseenter', function() {
    this.style.transform = 'rotate(-10deg)';
    this.style.animation = 'logoSpin 1.5s infinite alternate';
});

document.querySelector('.logo')?.addEventListener('mouseleave', function() {
    this.style.transform = 'rotate(0)';
    this.style.animation = 'none';
});

// Enhanced header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');
    const currentScroll = window.pageYOffset;
    
    if (header) {
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
        } else if (currentScroll > lastScroll) {
            header.classList.add('scrolled');
        } else {
            header.classList.add('scrolled');
        }
        
        lastScroll = currentScroll;
    }
});

// Active link highlighting
document.querySelectorAll('nav a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// Enhanced scroll animations with Intersection Observer
const animateElements = () => {
    const elements = document.querySelectorAll('.timeline-item, .value-card, .team-member, .stat-card, .feature-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize animations
window.addEventListener('DOMContentLoaded', animateElements);

// Smooth scrolling for anchor links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const currentlyActive = document.querySelector('.faq-question.active');
        if (currentlyActive && currentlyActive !== question) {
            currentlyActive.classList.remove('active');
            currentlyActive.nextElementSibling.style.maxHeight = '0';
        }
        
        question.classList.toggle('active');
        const answer = question.nextElementSibling;
        
        if (question.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0';
        }
    });
});

// Enhanced contact form submission
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Šalje se...';
    submitBtn.disabled = true;
    
    // Simulate submission
    setTimeout(() => {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.textAlign = 'center';
        successMessage.style.padding = '2rem';
        successMessage.innerHTML = `
            <h3 style="color: var(--primary-color);">✅ Poruka je poslata!</h3>
            <p>Hvala što ste nas kontaktirali. Odgovorićemo u najkraćem mogućem roku.</p>
        `;
        
        this.replaceWith(successMessage);
    }, 1500);
});

// Enhanced email validation
document.querySelector('input[type="email"]')?.addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
        this.style.borderColor = 'red';
        this.setCustomValidity('Unesite validnu email adresu');
    } else {
        this.style.borderColor = '';
        this.setCustomValidity('');
    }
});


// Force hardware acceleration for animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.hover-scale, .hover-shadow, .tech-icon, .value-card, .team-member, .feature-card, .testimonial-card'
    );
    
    animatedElements.forEach(el => {
        el.style.transform = 'translateZ(0)';
    });
    
});


