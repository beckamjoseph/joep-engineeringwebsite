const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
const closeMenu = () => { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); toggle.textContent = '☰'; };
toggle.addEventListener('click', () => { const open = links.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); toggle.textContent = open ? '×' : '☰'; });
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });
document.getElementById('year').textContent = new Date().getFullYear();
