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
  if (window.scrollY > 400) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
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
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
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

let autoSlide = setInterval(() => {
  updateSlide(currentSlide + 1);
}, 4000);

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

// ===== АНІМАЦІЯ ПОЯВИ =====
const fadeElements = document.querySelectorAll('.work-card, .feature-card, .hero-right, .faq-list, .anketa-block, .contacts-info');

function checkVisibility() {
  const windowHeight = window.innerHeight;
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 80 && rect.bottom > 0) {
      el.classList.add('visible');
    }
  });
}

fadeElements.forEach(el => {
  el.classList.add('fade-up');
});

window.addEventListener('load', checkVisibility);
window.addEventListener('scroll', checkVisibility);

// ===== ФІЛЬТРАЦІЯ ПОСЛУГ =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    const filter = this.dataset.filter;
    document.querySelectorAll('.work-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== ТЕМНА ТЕМА =====
const themeToggle = document.getElementById('themeToggle');
let darkMode = localStorage.getItem('darkMode') === 'true';

function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.classList.remove('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  localStorage.setItem('darkMode', isDark);
  darkMode = isDark;
}

setTheme(darkMode);

themeToggle?.addEventListener('click', () => {
  setTheme(!darkMode);
});

// ===== FAQ АККОРДЕОН =====
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', function() {
    const item = this.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// ===== TELEGRAM BOT + GOOGLE SHEETS =====
const BOT_TOKEN = '8637962406:AAFVmEMXur_eGh8aXuMxkLsxPQ-5R3maiqE';
const CHAT_ID = '6469987816';
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzKcldPw_DTv4sIsyt1pxVsXXycrXsbmOgwcvWT27sLphY28XXgXMr8r2EqRMH4Z2MG/exec';; // 👈 Сюди вставите URL Google Apps Script (інструкція нижче)

document.getElementById('anketaForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // ===== ВАЛІДАЦІЯ =====
  let isValid = true;
  let firstError = null;
  
  // Очищаємо попередні помилки
  this.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  
  // Перевірка обов'язкових текстових полів
  const requiredTexts = this.querySelectorAll('input[required], textarea[required]');
  requiredTexts.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('error');
      isValid = false;
      if (!firstError) firstError = input;
    }
  });
  
  // Перевірка обов'язкових radio-груп
  const requiredRadios = ['stage', 'status', 'age', 'region', 'amount', 'service'];
  requiredRadios.forEach(name => {
    const checked = this.querySelector(`input[name="${name}"]:checked`);
    if (!checked) {
      const group = this.querySelector(`input[name="${name}"]`)?.closest('.radio-group');
      if (group) {
        group.classList.add('error');
        if (!firstError) firstError = group;
      }
      isValid = false;
    }
  });
  
  // Перевірка сектору (хоча б один checkbox)
  const sectorChecked = this.querySelectorAll('input[name="sector[]"]:checked').length;
  if (sectorChecked === 0) {
    const group = this.querySelector('input[name="sector[]"]')?.closest('.checkbox-group');
    if (group) {
      group.classList.add('error');
      if (!firstError) firstError = group;
    }
    isValid = false;
  }
  
  // Перевірка витрат (хоча б один checkbox)
  const expensesChecked = this.querySelectorAll('input[name="expenses[]"]:checked').length;
  if (expensesChecked === 0) {
    const group = this.querySelector('input[name="expenses[]"]')?.closest('.checkbox-group');
    if (group) {
      group.classList.add('error');
      if (!firstError) firstError = group;
    }
    isValid = false;
  }
  
  if (!isValid) {
    alert('❌ Будь ласка, заповніть усі обов\'язкові поля (позначені *)');
    firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  
  // ===== ЗБІР ДАНИХ =====
  const formData = new FormData(this);
  const data = {};
  
  // Текстові поля
  data['Ім\'я'] = formData.get('name');
  data['Телефон'] = formData.get('phone');
  data['Email'] = formData.get('email') || '—';
  data['Етап бізнесу'] = formData.get('stage');
  data['Про бізнес'] = formData.get('business');
  data['Статус'] = formData.get('status');
  data['Вік ФОП'] = formData.get('fop_age') || '—';
  data['Вік'] = formData.get('age');
  data['Регіон'] = formData.get('region');
  data['Сума'] = formData.get('amount');
  data['Послуга'] = formData.get('service');
  
  // Checkbox-групи
  const special = formData.getAll('special[]').filter(v => v !== 'Нічого з переліченого');
  const specialOther = formData.get('special_other');
  data['Особливий статус'] = special.length ? special.join(', ') + (specialOther ? ` (${specialOther})` : '') : 'Нічого з переліченого';
  
  const sector = formData.getAll('sector[]');
  const sectorOther = formData.get('sector_other');
  data['Сектор'] = sector.join(', ') + (sectorOther ? ` (${sectorOther})` : '');
  
  const expenses = formData.getAll('expenses[]');
  const expensesOther = formData.get('expenses_other');
  data['Витрати'] = expenses.join(', ') + (expensesOther ? ` (${expensesOther})` : '');
  
  // ===== ФОРМУВАННЯ ПОВІДОМЛЕННЯ =====
  let text = '📩 НОВА ЗАЯВКА НА СПІВПРАЦЮ\n\n';
  text += `👤 Ім'я: ${data['Ім\'я']}\n`;
  text += `📞 Телефон: ${data['Телефон']}\n`;
  text += `📧 Email: ${data['Email']}\n\n`;
  text += `📊 Етап бізнесу: ${data['Етап бізнесу']}\n`;
  text += `💼 Статус: ${data['Статус']}\n`;
  text += `📅 Вік ФОП: ${data['Вік ФОП']}\n`;
  text += `🎂 Вік: ${data['Вік']}\n\n`;
  text += `📍 Регіон: ${data['Регіон']}\n`;
  text += `🎯 Сектор: ${data['Сектор']}\n\n`;
  text += `💰 Сума: ${data['Сума']}\n`;
  text += `💸 Витрати: ${data['Витрати']}\n`;
  text += `⭐ Особливий статус: ${data['Особливий статус']}\n\n`;
  text += `🛠 Послуга: ${data['Послуга']}\n\n`;
  text += `📝 Про бізнес:\n${data['Про бізнес']}`;
  
  // ===== ВІДПРАВКА В TELEGRAM =====
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        chat_id: CHAT_ID, 
        text: text
      })
    });
    
    if (response.ok) {
      // ===== ВІДПРАВКА В GOOGLE SHEETS (якщо URL налаштовано) =====
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
      
      alert('✅ Дякую! Ваша заявка надіслана. Я зв\'яжуся з вами найближчим часом!');
      this.reset();
    } else {
      alert('❌ Сталася помилка. Спробуйте ще раз або напишіть мені в Telegram.');
    }
  } catch (error) {
    alert('❌ Помилка з\'єднання. Перевірте інтернет.');
  }
});