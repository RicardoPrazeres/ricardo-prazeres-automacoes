const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#menu');

function closeMenu() {
    if (!menuButton || !menu) return;
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
}

if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('menu-open', isOpen);
    });

    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
        if (window.innerWidth > 820) closeMenu();
    });
}

const form = document.querySelector('#contactForm');

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const name = String(data.get('name') || '').trim();
        const project = String(data.get('project') || '').trim();
        const message = `Olá, Ricardo. Meu nome é ${name}.\n\nSobre o meu projeto: ${project}`;
        const url = `https://wa.me/5511946038180?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    });
}

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
