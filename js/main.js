/* ═══════════════════════════════════════════════
   GM GLOBAL CONSTRUCCIONES S.A.S.
   main.js — Interactividad principal
════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Menú hamburguesa (móvil) ─────────── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ── 2. Scroll suave para enlaces ancla ───── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('navbar')?.offsetHeight || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── 3. Animaciones al hacer scroll ────────── */
  const animatedEls = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), idx * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  animatedEls.forEach(el => observer.observe(el));

  /* ── 4. Navbar sombra al hacer scroll ──────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 60 ? '0 4px 20px rgba(0,0,0,0.4)' : 'none';
  });

  /* ── 5. Formulario de contacto ──────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre  = form.querySelector('#nombre').value.trim();
      const email   = form.querySelector('#email').value.trim();
      const mensaje = form.querySelector('#mensaje').value.trim();
      const btn     = form.querySelector('.btn-submit');

      if (!nombre || !email || !mensaje) {
        showAlert('Por favor complete todos los campos obligatorios.', 'error');
        return;
      }
      if (!isValidEmail(email)) {
        showAlert('Ingrese un correo electrónico válido.', 'error');
        return;
      }

      /* === Aquí va su integración real ===
         Opción A — Formspree (sin backend):
         fetch('https://formspree.io/f/XXXXXXXX', {
           method: 'POST', headers: {'Content-Type':'application/json'},
           body: JSON.stringify({ nombre, email, mensaje })
         })

         Opción B — Su propio endpoint:
         fetch('/api/contacto', { method:'POST', body: formData })
      */

      btn.textContent = 'Enviando...';
      btn.disabled    = true;

      setTimeout(() => {
        showAlert('¡Mensaje enviado! Nos comunicaremos pronto.', 'success');
        form.reset();
        btn.textContent = 'Enviar solicitud';
        btn.disabled    = false;
      }, 1500);
    });
  }

  /* ── Helpers ─────────────────────────────── */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showAlert(message, type) {
    const prev = document.getElementById('form-alert');
    if (prev) prev.remove();
    const alert = document.createElement('p');
    alert.id = 'form-alert';
    alert.textContent = message;
    alert.style.cssText = `
      text-align:center; padding:12px 20px; font-size:13.5px; font-weight:500;
      border-radius:2px; margin-top:0.5rem;
      color:${type === 'success' ? '#29D9CB' : '#FF6B6B'};
      background:${type === 'success' ? 'rgba(41,217,203,0.08)' : 'rgba(255,107,107,0.08)'};
      border:1px solid ${type === 'success' ? 'rgba(41,217,203,0.3)' : 'rgba(255,107,107,0.3)'};
    `;
    document.getElementById('contactForm').appendChild(alert);
    setTimeout(() => alert.remove(), 5000);
  }

});