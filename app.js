'use strict';
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.querySelector('#year').textContent = new Date().getFullYear();
const dialog = document.querySelector('#contact-dialog');
const products = {
  signals: { title: 'Experimente Alpha Signals.', description: '30 dias grátis para conhecer os sinais. Após o período gratuito, R$ 200 por mês.', message: 'Olá! Quero conhecer o Alpha Signals: 30 dias grátis e, depois, R$ 200/mês.' },
  mt5: { title: 'Conecte seu MetaTrader 5.', description: 'Implantação técnica por R$ 2.400, sujeita à validação de compatibilidade do seu ambiente.', message: 'Olá! Quero conhecer a integração Alpha MT5 Connect, por R$ 2.400.' }
};
document.querySelectorAll('[data-plan]').forEach(button => button.addEventListener('click', () => {
  const product = products[button.dataset.plan];
  document.querySelector('#dialog-title').textContent = product.title;
  document.querySelector('#dialog-description').textContent = product.description;
  const config = window.ALPHALAB_CONFIG || {};
  const phone = String(config.whatsapp || '').replace(/\D/g, '');
  const email = String(config.email || '').trim();
  let href = '';
  if (/^\d{10,15}$/.test(phone)) href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(product.message);
  else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) href = 'mailto:' + email + '?subject=' + encodeURIComponent('Conhecer AlphaLab') + '&body=' + encodeURIComponent(product.message);
  document.querySelector('#contact-ready').hidden = !href;
  document.querySelector('#contact-pending').hidden = Boolean(href);
  const contact = document.querySelector('#contact-link');
  contact.href = href || '#duvidas';
  if (href.startsWith('https://')) { contact.target = '_blank'; contact.rel = 'noopener noreferrer'; }
  else { contact.removeAttribute('target'); contact.removeAttribute('rel'); }
  dialog.showModal(); document.body.classList.add('dialog-open');
}));
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });

document.querySelectorAll('[data-dialog-link]').forEach(link => link.addEventListener('click', () => dialog.close()));
