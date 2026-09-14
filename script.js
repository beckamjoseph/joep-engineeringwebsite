const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
const closeMenu = () => { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); toggle.textContent = '☰'; };
toggle.addEventListener('click', () => { const open = links.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); toggle.textContent = open ? '×' : '☰'; });
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });
document.getElementById('year').textContent = new Date().getFullYear();

const galleryItems = [...document.querySelectorAll('[data-full]')];
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxDescription = document.querySelector('.lightbox-description');
const lightboxCount = document.querySelector('.lightbox-count');
const closeLightbox = document.querySelector('.lightbox-close');
const previousImage = document.querySelector('.lightbox-prev');
const nextImage = document.querySelector('.lightbox-next');
let activeImage = 0;
let lastFocusedElement;

function showImage(index) {
  activeImage = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[activeImage];
  lightboxImage.src = item.dataset.full;
  lightboxImage.alt = item.querySelector('img')?.alt || item.dataset.title;
  lightboxTitle.textContent = item.dataset.title;
  lightboxDescription.textContent = item.dataset.description;
  lightboxCount.textContent = `${activeImage + 1} / ${galleryItems.length}`;
}

function openLightbox(index) {
  lastFocusedElement = document.activeElement;
  showImage(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  closeLightbox.focus();
}

function hideLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  if (lastFocusedElement) lastFocusedElement.focus();
}

galleryItems.forEach((item, index) => item.addEventListener('click', () => openLightbox(index)));
closeLightbox.addEventListener('click', hideLightbox);
previousImage.addEventListener('click', () => showImage(activeImage - 1));
nextImage.addEventListener('click', () => showImage(activeImage + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) hideLightbox(); });
document.addEventListener('keydown', event => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') hideLightbox();
  if (event.key === 'ArrowLeft') showImage(activeImage - 1);
  if (event.key === 'ArrowRight') showImage(activeImage + 1);
});
