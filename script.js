const menuButton = document.querySelector('.menu-button');
const mainMenu = document.querySelector('#menu-principal');

function closeMenu() {
  if (!menuButton || !mainMenu) return;

  menuButton.setAttribute('aria-expanded', 'false');
  mainMenu.classList.remove('is-open');
  menuButton.querySelector('.sr-only').textContent = 'Abrir menu';
}

if (menuButton && mainMenu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    mainMenu.classList.toggle('is-open', !isOpen);
    menuButton.querySelector('.sr-only').textContent = isOpen ? 'Abrir menu' : 'Fechar menu';
  });

  mainMenu.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      menuButton.focus();
    }
  });

  const desktopBreakpoint = window.matchMedia('(min-width: 820px)');
  desktopBreakpoint.addEventListener('change', closeMenu);
}

const year = document.querySelector('#ano');
if (year) year.textContent = new Date().getFullYear();
