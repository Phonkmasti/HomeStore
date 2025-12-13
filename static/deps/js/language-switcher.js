let currentLanguage = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  
  document.documentElement.lang = lang;
  document.documentElement.setAttribute('data-language', lang);
  
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    const translations = window.translations;
    
    if (translations && translations[lang] && translations[lang][key]) {
      if (element.tagName === 'INPUT') {
        if (element.type === 'email' || element.type === 'text' || element.type === 'password' || element.type === 'search') {
          element.placeholder = translations[lang][key];
        }
      } else {
        element.innerHTML = translations[lang][key];
      }
    }
  });
  
  const languageBtn = document.getElementById('language-switcher-btn');
  if (languageBtn) {
    languageBtn.textContent = lang === 'en' ? 'EN' : 'РУ';
  }
  
  const mobileLangBtn = document.getElementById('language-switcher-btn-mobile');
  if (mobileLangBtn) {
    mobileLangBtn.textContent = lang === 'en' ? 'EN' : 'РУ';
  }
  
  translateMessages(lang);
  closeLanguageDropdown();
}

function toggleLanguageDropdown() {
  const dropdown = document.getElementById('language-dropdown');
  const mobileDropdown = document.getElementById('language-dropdown-mobile');
  
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  }
  
  if (mobileDropdown) {
    mobileDropdown.style.display = mobileDropdown.style.display === 'none' ? 'block' : 'none';
  }
}

function closeLanguageDropdown() {
  const dropdown = document.getElementById('language-dropdown');
  const mobileDropdown = document.getElementById('language-dropdown-mobile');
  
  if (dropdown) {
    dropdown.style.display = 'none';
  }
  
  if (mobileDropdown) {
    mobileDropdown.style.display = 'none';
  }
}

function setLanguageFromDropdown(lang) {
  setLanguage(lang);
}

document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('language-dropdown');
  const mobileDropdown = document.getElementById('language-dropdown-mobile');
  const btn = document.getElementById('language-switcher-btn');
  const mobileBtnWrapper = document.getElementById('language-switcher-btn-mobile');
  
  const isDesktopButtonClicked = btn && btn.contains(event.target);
  const isMobileButtonClicked = mobileBtnWrapper && mobileBtnWrapper.contains(event.target);
  
  if (!isDesktopButtonClicked && !isMobileButtonClicked) {
    if (dropdown && !dropdown.contains(event.target)) {
      dropdown.style.display = 'none';
    }
    if (mobileDropdown && !mobileDropdown.contains(event.target)) {
      mobileDropdown.style.display = 'none';
    }
  }
});

function translateMessages(lang) {
  const notifications = document.querySelectorAll('.notification-text');
  notifications.forEach(notification => {
    const messageText = notification.textContent.trim();
    if (messageText.startsWith('msg_') && window.translations && window.translations[lang] && window.translations[lang][messageText]) {
      notification.textContent = window.translations[lang][messageText];
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fetch('/static/deps/js/translations.json')
    .then(response => response.json())
    .then(data => {
      window.translations = data;
      setLanguage(currentLanguage);
      translateMessages(currentLanguage);
    })
    .catch(error => console.error('Error loading translations:', error));
});
