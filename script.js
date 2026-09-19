window.addEventListener('load', () => document.getElementById('preloader')?.classList.add('hide'));

window.addEventListener('scroll', () => {
  const s = document.body.scrollTop || document.documentElement.scrollTop;
  const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.getElementById('progressBar').style.width = (s/h)*100 + '%';
  const btn = document.getElementById('backToTop');
  if (window.scrollY > 400) btn.classList.add('show');
  else btn.classList.remove('show');
});

document.getElementById('backToTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.getElementById('burgerMenu')?.addEventListener('click', () => document.getElementById('navMenu').classList.toggle('open'));
document.querySelectorAll('.nav-menu a').forEach(l => l.addEventListener('click', () => document.getElementById('navMenu')?.classList.remove('open')));

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const t = this.getAttribute('href');
    if (t === '#') return;
    const target = document.querySelector(t);
    if (target) {
      e.preventDefault();
      const hh = document.querySelector('header').offsetHeight;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - hh - 10, behavior: 'smooth' });
    }
  });
});

let currentSlide = 0;
const slides = document.querySelector('#slides');
const totalSlides = slides ? slides.querySelectorAll('img').length : 0;
function updateSlide(i) {
  if (!slides) return;
  if (i < 0) i = totalSlides - 1;
  if (i >= totalSlides) i = 0;
  currentSlide = i;
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}
let autoSlide = setInterval(() => updateSlide(currentSlide + 1), 4000);
document.getElementById('prevBtn')?.addEventListener('click', () => { clearInterval(autoSlide); updateSlide(currentSlide - 1); autoSlide = setInterval(() => updateSlide(currentSlide + 1), 4000); });
document.getElementById('nextBtn')?.addEventListener('click', () => { clearInterval(autoSlide); updateSlide(currentSlide + 1); autoSlide = setInterval(() => updateSlide(currentSlide + 1), 4000); });

const sliderEl = document.querySelector('.about-slider');
let tsx = 0;
if (sliderEl) {
  sliderEl.addEventListener('touchstart', e => { tsx = e.changedTouches[0].screenX; }, { passive: true });
  sliderEl.addEventListener('touchend', e => {
    const d = tsx - e.changedTouches[0].screenX;
    if (Math.abs(d) < 50) return;
    clearInterval(autoSlide);
    updateSlide(d > 0 ? currentSlide + 1 : currentSlide - 1);
    autoSlide = setInterval(() => updateSlide(currentSlide + 1), 4000);
  }, { passive: true });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const f = this.dataset.filter;
    document.querySelectorAll('.work-card').forEach(c => {
      c.style.display = (f === 'all' || c.dataset.category === f) ? 'flex' : 'none';
    });
  });
});

const themeToggle = document.getElementById('themeToggle');
let darkMode = localStorage.getItem('darkMode') === 'true';
const iconMoon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.39 5.39 0 01-4.4 2.26 5.4 5.4 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
const iconSun = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7a5 5 0 100 10 5 5 0 000-10zM2 13h2a1 1 0 000-2H2a1 1 0 000 2zm18 0h2a1 1 0 000-2h-2a1 1 0 000 2zM11 2v2a1 1 0 002 0V2a1 1 0 00-2 0zm0 18v2a1 1 0 002 0v-2a1 1 0 00-2 0zM5.99 4.58a1 1 0 00-1.41 1.41l1.06 1.06a1 1 0 001.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 00-1.41 1.41l1.06 1.06a1 1 0 001.41-1.41l-1.06-1.06zm1.06-12.37l-1.06 1.06a1 1 0 001.41 1.41l1.06-1.06a1 1 0 00-1.41-1.41zM7.05 18.36l-1.06 1.06a1 1 0 001.41 1.41l1.06-1.06a1 1 0 00-1.41-1.41z"/></svg>';
function setTheme(d) {
  document.body.classList.toggle('dark-mode', d);
  themeToggle.innerHTML = d ? iconSun : iconMoon;
  localStorage.setItem('darkMode', d);
  darkMode = d;
}
setTheme(darkMode);
themeToggle?.addEventListener('click', () => setTheme(!darkMode));

document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', function() {
    const item = this.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

function gtmEvent(n, d = {}) { if (window.dataLayer) window.dataLayer.push({ event: n, ...d }); }
document.querySelectorAll('.work-card .btn-primary').forEach(b => b.addEventListener('click', function() {
  const c = this.closest('.work-card');
  gtmEvent('service_click', { service_name: c?.querySelector('h3')?.textContent || 'Unknown' });
}));
document.querySelectorAll('.header-socials a, .contact-item a').forEach(l => l.addEventListener('click', function() {
  const h = this.getAttribute('href') || '';
  let t = 'other';
  if (h.startsWith('tel:')) t = 'phone';
  else if (h.includes('t.me')) t = 'telegram';
  else if (h.includes('instagram')) t = 'instagram';
  else if (h.startsWith('mailto:')) t = 'email';
  gtmEvent('contact_click', { contact_type: t });
}));

const BOT_TOKEN = '8637962406:AAFVmEMXur_eGh8aXuMxkLsxPQ-5R3maiqE';
const CHAT_ID = '6469987816';
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzKcldPw_DTv4sIsyt1pxVsXXycrXsbmOgwcvWT27sLphY28XXgXMr8r2EqRMH4Z2MG/exec';

document.getElementById('anketaForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  let ok = true, firstErr = null;
  this.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  this.querySelectorAll('input[required], textarea[required]').forEach(i => {
    if (!i.value.trim()) { i.classList.add('error'); ok = false; if (!firstErr) firstErr = i; }
  });
  ['stage', 'age', 'location_status', 'amount', 'jobs', 'prev_grant', 'debt'].forEach(n => {
    if (!this.querySelector(`input[name="${n}"]:checked`)) {
      const g = this.querySelector(`input[name="${n}"]`)?.closest('.radio-group');
      if (g) { g.classList.add('error'); if (!firstErr) firstErr = g; }
      ok = false;
    }
  });
  ['expenses[]', 'help[]'].forEach(n => {
    if (this.querySelectorAll(`input[name="${n}"]:checked`).length === 0) {
      const g = this.querySelector(`input[name="${n}"]`)?.closest('.checkbox-group');
      if (g) { g.classList.add('error'); if (!firstErr) firstErr = g; }
      ok = false;
    }
  });
  if (!ok) { alert('❌ Заповніть обов\'язкові поля'); firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  
  const fd = new FormData(this);
  const d = {};
  d['Ім\'я'] = fd.get('name'); d['Телефон'] = fd.get('phone'); d['Email'] = fd.get('email');
  d['Етап'] = fd.get('stage'); d['Діяльність'] = fd.get('business'); d['КВЕД'] = fd.get('kved') || '—';
  d['Вік'] = fd.get('age'); d['Область'] = fd.get('region'); d['Місто'] = fd.get('city');
  d['Статус локації'] = fd.get('location_status'); d['Сума'] = fd.get('amount');
  d['Робочі місця'] = fd.get('jobs'); d['Попередній грант'] = fd.get('prev_grant');
  d['Заборгованість'] = fd.get('debt');
  d['Особливий статус'] = fd.getAll('special[]').join(', ') || '—';
  d['Витрати'] = fd.getAll('expenses[]').join(', ');
  d['Допомога'] = fd.getAll('help[]').join(', ');
  
  let text = '📩 НОВА АНКЕТА\n\n';
  for (const k in d) text += `${k}: ${d[k]}\n`;
  
  try {
    const r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: text })
    });
    if (r.ok) {
      if (GOOGLE_SHEETS_URL) {
        try { await fetch(GOOGLE_SHEETS_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }); } catch(e) {}
      }
      gtmEvent('form_submit_success', { form_name: 'anketa' });
      alert('Дякую! Я отримала вашу анкету. Перегляну надану інформацію та зв\'яжуся з вами, щоб узгодити час консультації.');
      this.reset();
    } else {
      alert('❌ Помилка. Спробуйте ще.');
    }
  } catch (e) {
    alert('❌ Помилка з\'єднання.');
  }
});