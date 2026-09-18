// ===== ПРЕЛОАДЕР =====
window.addEventListener('load', () => {
  document.getElementById('preloader')?.classList.add('hide');
});

// ===== ПРОГРЕС-БАР =====
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('progressBar').style.width = scrolled + '%';
});

// ===== КНОПКА "ВГОРУ" =====
window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTop');
  if (window.scrollY > 400) btn.classList.add('show');
  else btn.classList.remove('show');
});
document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== БУРГЕР-МЕНЮ =====
document.getElementById('burgerMenu')?.addEventListener('click', () => {
  document.getElementById('navMenu').classList.toggle('open');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navMenu')?.classList.remove('open');
  });
});

// ===== ПЛАВНИЙ СКРОЛ =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ===== СЛАЙДЕР =====
let currentSlide = 0;
const slides = document.querySelector('#slides');
const totalSlides = slides ? slides.querySelectorAll('img').length : 0;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateSlide(index) {
  if (!slides) return;
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;
  currentSlide = index;
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

let autoSlide = setInterval(() => updateSlide(currentSlide + 1), 4000);

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    clearInterval(autoSlide);
    updateSlide(currentSlide - 1);
    autoSlide = setInterval(() => updateSlide(currentSlide + 1), 4000);
  });
  nextBtn.addEventListener('click', () => {
    clearInterval(autoSlide);
    updateSlide(currentSlide + 1);
    autoSlide = setInterval(() => updateSlide(currentSlide + 1), 4000);
  });
}

// ===== SWIPE =====
const sliderEl = document.querySelector('.about-slider');
let touchStartX = 0, touchEndX = 0;

if (sliderEl) {
  sliderEl.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderEl.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) < 50) return;
    clearInterval(autoSlide);
    if (diff > 0) updateSlide(currentSlide + 1);
    else updateSlide(currentSlide - 1);
    autoSlide = setInterval(() => updateSlide(currentSlide + 1), 4000);
  }, { passive: true });
}

// ===== ФІЛЬТРАЦІЯ =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('.work-card').forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'flex' : 'none';
    });
  });
});

// ===== ТЕМНА ТЕМА =====
const themeToggle = document.getElementById('themeToggle');
let darkMode = localStorage.getItem('darkMode') === 'true';

const iconMoon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.39 5.39 0 01-4.4 2.26 5.4 5.4 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
const iconSun = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7a5 5 0 100 10 5 5 0 000-10zM2 13h2a1 1 0 000-2H2a1 1 0 000 2zm18 0h2a1 1 0 000-2h-2a1 1 0 000 2zM11 2v2a1 1 0 002 0V2a1 1 0 00-2 0zm0 18v2a1 1 0 002 0v-2a1 1 0 00-2 0zM5.99 4.58a1 1 0 00-1.41 1.41l1.06 1.06a1 1 0 001.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 00-1.41 1.41l1.06 1.06a1 1 0 001.41-1.41l-1.06-1.06zm1.06-12.37l-1.06 1.06a1 1 0 001.41 1.41l1.06-1.06a1 1 0 00-1.41-1.41zM7.05 18.36l-1.06 1.06a1 1 0 001.41 1.41l1.06-1.06a1 1 0 00-1.41-1.41z"/></svg>';

function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = iconSun;
  } else {
    document.body.classList.remove('dark-mode');
    themeToggle.innerHTML = iconMoon;
  }
  localStorage.setItem('darkMode', isDark);
  darkMode = isDark;
}
setTheme(darkMode);
themeToggle?.addEventListener('click', () => setTheme(!darkMode));

// ===== FAQ =====
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', function() {
    const item = this.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ===== GTM =====
function gtmEvent(eventName, eventData = {}) {
  if (window.dataLayer) window.dataLayer.push({ event: eventName, ...eventData });
}

document.querySelectorAll('.work-card .btn-primary').forEach(btn => {
  btn.addEventListener('click', function() {
    const card = this.closest('.work-card');
    gtmEvent('service_click', { service_name: card?.querySelector('h3')?.textContent || 'Unknown' });
  });
});

document.querySelectorAll('.header-socials a, .contact-item a').forEach(link => {
  link.addEventListener('click', function() {
    const href = this.getAttribute('href') || '';
    let type = 'other';
    if (href.startsWith('tel:')) type = 'phone';
    else if (href.includes('t.me')) type = 'telegram';
    else if (href.includes('instagram')) type = 'instagram';
    else if (href.startsWith('mailto:')) type = 'email';
    gtmEvent('contact_click', { contact_type: type });
  });
});

document.querySelector('.hero-right .btn-primary')?.addEventListener('click', function() {
  gtmEvent('cta_click', { button: 'pereviryty_grant' });
});

document.querySelector('.approach-block .btn-primary')?.addEventListener('click', function() {
  gtmEvent('cta_click', { button: 'nadislaty_anketu_about' });
});

// ===== TELEGRAM BOT + GOOGLE SHEETS =====
const BOT_TOKEN = '8637962406:AAFVmEMXur_eGh8aXuMxkLsxPQ-5R3maiqE';
const CHAT_ID = '6469987816';
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzKcldPw_DTv4sIsyt1pxVsXXycrXsbmOgwcvWT27sLphY28XXgXMr8r2EqRMH4Z2MG/exec';

document.getElementById('anketaForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  let isValid = true;
  let firstError = null;
  
  this.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  
  // Текстові обов'язкові
  this.querySelectorAll('input[required], textarea[required]').forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('error');
      isValid = false;
      if (!firstError) firstError = input;
    }
  });
  
  // Radio-групи обов'язкові
  const requiredRadios = ['stage', 'age', 'location_status', 'amount', 'jobs', 'prev_grant', 'debt'];
  requiredRadios.forEach(name => {
    if (!this.querySelector(`input[name="${name}"]:checked`)) {
      const group = this.querySelector(`input[name="${name}"]`)?.closest('.radio-group');
      if (group) {
        group.classList.add('error');
        if (!firstError) firstError = group;
      }
      isValid = false;
    }
  });
  
  // Checkbox-групи обов'язкові
  const requiredCheckboxes = ['expenses[]', 'help[]'];
  requiredCheckboxes.forEach(name => {
    if (this.querySelectorAll(`input[name="${name}"]:checked`).length === 0) {
      const group = this.querySelector(`input[name="${name}"]`)?.closest('.checkbox-group');
      if (group) {
        group.classList.add('error');
        if (!firstError) firstError = group;
      }
      isValid = false;
    }
  });
  
  if (!isValid) {
    alert('❌ Будь ласка, заповніть усі обов\'язкові поля (позначені *)');
    firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  
  const formData = new FormData(this);
  const data = {};
  
  data['Ім\'я'] = formData.get('name');
  data['Телефон'] = formData.get('phone');
  data['Email'] = formData.get('email');
  data['Етап бізнесу'] = formData.get('stage');
  data['Вид діяльності'] = formData.get('business');
  data['КВЕД'] = formData.get('kved') || '—';
  data['Вік'] = formData.get('age');
  data['Регіон'] = formData.get('region');
  data['Населений пункт'] = formData.get('city');
  data['Статус локації'] = formData.get('location_status');
  data['Сума гранту'] = formData.get('amount');
  data['Робочі місця'] = formData.get('jobs');
  data['Попередній грант'] = formData.get('prev_grant');
  data['Заборгованість'] = formData.get('debt');
  
  const special = formData.getAll('special[]');
  const specialOther = formData.get('special_other');
  data['Особливий статус'] = special.length ? special.join(', ') + (specialOther ? ` (${specialOther})` : '') : '—';
  
  const expenses = formData.getAll('expenses[]');
  const expensesOther = formData.get('expenses_other');
  data['Витрати'] = expenses.join(', ') + (expensesOther ? ` (${expensesOther})` : '');
  
  const help = formData.getAll('help[]');
  data['Допомога'] = help.join(', ');
  
  let text = '📩 НОВА АНКЕТА\n\n';
  text += `👤 Ім'я: ${data['Ім\'я']}\n`;
  text += `📞 Телефон: ${data['Телефон']}\n`;
  text += `📧 Email: ${data['Email']}\n\n`;
  text += `📊 Етап бізнесу: ${data['Етап бізнесу']}\n`;
  text += `💼 Вид діяльності: ${data['Вид діяльності']}\n`;
  text += `🔢 КВЕД: ${data['КВЕД']}\n`;
  text += `🎂 Вік: ${data['Вік']}\n\n`;
  text += `📍 Область: ${data['Регіон']}\n`;
  text += `🏘 Населений пункт: ${data['Населений пункт']}\n`;
  text += `📍 Статус локації: ${data['Статус локації']}\n\n`;
  text += `💰 Сума гранту: ${data['Сума гранту']}\n`;
  text += `👥 Робочі місця: ${data['Робочі місця']}\n`;
  text += `📜 Попередній грант: ${data['Попередній грант']}\n`;
  text += `💳 Заборгованість: ${data['Заборгованість']}\n\n`;
  text += `⭐ Особливий статус: ${data['Особливий статус']}\n\n`;
  text += `💸 Витрати: ${data['Витрати']}\n\n`;
  text += `🛠 Допомога: ${data['Допомога']}`;
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: text })
    });
    
    if (response.ok) {
      if (GOOGLE_SHEETS_URL) {
        try {
          await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
        } catch (err) {
          console.warn('Google Sheets помилка:', err);
        }
      }
      
      gtmEvent('form_submit_success', { form_name: 'anketa' });
      
      alert('Дякую! Я отримала вашу анкету. Перегляну надану інформацію та зв\'яжуся з вами, щоб узгодити час консультації.');
      this.reset();
    } else {
      alert('❌ Сталася помилка. Спробуйте ще раз або напишіть мені в Telegram.');
    }
  } catch (error) {
    alert('❌ Помилка з\'єднання. Перевірте інтернет.');
  }
});});
