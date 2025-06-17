document.addEventListener('DOMContentLoaded', function() {
    // Naručivanje dugme funkcionalnost
    const orderButtons = document.querySelectorAll('.cta-button');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.closest('.pricing-card').querySelector('h3').textContent;
            window.location.href = `contact.html?package=${encodeURIComponent(packageName)}`;
        });
    });
    
    // Proveri URL za posebnu poruku ako je došao sa services stranice
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('from') && urlParams.get('from') === 'services') {
        alert('Hvala što posmatrate naše usluge! Kontaktirajte nas za besplatnu konsultaciju.');
    }
});
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        question.nextElementSibling.classList.toggle('active');
    });
});
// services.js - automatsko zatvaranje ostalih FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const currentlyActive = document.querySelector('.faq-question.active');
        if (currentlyActive && currentlyActive !== question) {
            currentlyActive.classList.remove('active');
            currentlyActive.nextElementSibling.classList.remove('active');
        }
        question.classList.toggle('active');
        question.nextElementSibling.classList.toggle('active');
    });
});