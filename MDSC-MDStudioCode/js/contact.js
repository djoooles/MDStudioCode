document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Sprečava osvežavanje stranice
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Šaljem...';

            // Prikupljanje podataka iz forme
            const formData = new FormData(contactForm);

            // Slanje podataka na server
            fetch(contactForm.action, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Greška u mreži');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Prikaži poruku o uspehu
                    successMessage.style.display = 'block';
                    // Resetuj formu
                    contactForm.reset();
                    
                    // Automatski sakrij poruku nakon 5 sekundi
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                } else {
                    alert(data.message || 'Došlo je do greške prilikom slanja poruke');
                }
            })
            .catch(error => {
                console.error('Greška:', error);
                alert('Došlo je do greške. Molimo pokušajte ponovo kasnije.');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Pošalji upit';
            });
        });
    }

    // Validacija emaila
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
                this.style.borderColor = 'red';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    }
});