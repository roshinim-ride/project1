const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const sections = document.querySelectorAll('main section[id]');
const revealItems = document.querySelectorAll('.reveal');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');

menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.textContent = isOpen ? 'Close' : 'Menu';
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = 'Menu';
    });
});

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
    });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value.trim();
    formStatus.textContent = `Thanks, ${name || 'there'}! Your message is ready to send.`;
    contactForm.reset();
});
