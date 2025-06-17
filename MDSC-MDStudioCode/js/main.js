// main.js
document.querySelectorAll('nav a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});
// Dodaj na kraj main.js
const mobileMenu = document.querySelector('.mobile-menu');
const navUl = document.querySelector('nav ul');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });
}