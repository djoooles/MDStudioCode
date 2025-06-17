document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulacija uspešnog slanja
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Šaljem...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                contactForm.innerHTML = `
                    <div class="success-message" style="text-align: center; padding: 2rem;">
                        <h3 style="color: var(--primary-color);">✅ Poruka je poslata!</h3>
                        <p>Hvala što ste nas kontaktirali. Odgovorićemo u najkraćem mogućem roku.</p>
                    </div>
                `;
            }, 1500);
        });
    }
});
// contact.js - dodajte validaciju
const emailInput = document.querySelector('input[type="email"]');
emailInput.addEventListener('blur', () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        emailInput.style.borderColor = 'red';
    }
});