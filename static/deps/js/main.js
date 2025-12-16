const element1 = document.getElementById('dropdownbutton'); 
const element2 = document.getElementById('dropdowncontent'); 

function updateWidth() {
  const width1 = element1.offsetWidth;
  element2.style.width = width1 + 'px';
}

updateWidth();

window.addEventListener('resize', updateWidth);

function dropDownFunction() {
  updateWidth();
  element2.classList.toggle("show");
}

function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("active");
}

window.onclick = function(event) {
  if (!event.target.matches('.drop-down-button-search')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }

  const burger = document.querySelector('.burger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (burger && mobileMenu && mobileMenu.classList.contains('active')) {
    if (!burger.contains(event.target) && !mobileMenu.contains(event.target)) {
      mobileMenu.classList.remove('active');
    }
  }
};

const banner = document.querySelector('.discount-banner');
const nav = document.querySelector('nav');
const navPlaceholder = document.getElementById('navPlaceholder');

function updateNavSticky() {
  const navTop = nav ? nav.offsetTop : 0;
  const scrollPosition = window.scrollY;
  
  if (scrollPosition >= navTop) {
    nav.classList.add('nav-sticky');
    if (navPlaceholder) {
      navPlaceholder.style.height = nav.offsetHeight + 'px';
    }
  } else {
    nav.classList.remove('nav-sticky');
    if (navPlaceholder) {
      navPlaceholder.style.height = '0';
    }
  }
}

window.addEventListener('scroll', updateNavSticky);

window.addEventListener('load', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    const navTop = nav.offsetTop;
    const navPadding = parseInt(window.getComputedStyle(nav).paddingTop);
    window.scrollTo(0, navTop - navPadding);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const categoryForm = document.getElementById('categoryForm');
  if (categoryForm) {
    const categoryRadios = categoryForm.querySelectorAll('input[name="category"]');
    categoryRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        const selectedCategory = this.value;
        const searchQuery = new URLSearchParams(window.location.search).get('q');
        let url = `/catalog/${selectedCategory}/`;
        if (searchQuery) {
          url += `?q=${encodeURIComponent(searchQuery)}`;
        }
        window.location.href = url;
      });
    });
  }

  document.querySelectorAll('.product-image').forEach(imageContainer => {
    const images = imageContainer.querySelectorAll('.product-img');
    let currentImageIndex = 0;

    if (images.length > 1) {
      const imageLink = imageContainer.closest('.product-image-link');
      if (imageLink) {
        imageLink.style.cursor = 'pointer';
      }
      
      imageContainer.addEventListener('mouseenter', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images.forEach((img, index) => {
          img.style.opacity = index === currentImageIndex ? '1' : '0';
        });
      });

      imageContainer.addEventListener('mouseleave', function() {
        currentImageIndex = 0;
        images.forEach((img, index) => {
          img.style.opacity = index === 0 ? '1' : '0';
        });
      });
    }
  });

  const newsletterForms = document.querySelectorAll('.newsletter-footer-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function() {
      if (this.getAttribute('data-authenticated') === 'true') {
        sessionStorage.setItem('scrollToFooter', 'true');
      }
    });
  });

  if (sessionStorage.getItem('scrollToFooter')) {
    sessionStorage.removeItem('scrollToFooter');
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }

  function displayMessage(messageText, tags = 'success') {
    const container = document.querySelector('.notifications-container');
    if (!container) return;

    const notificationClass = `notification notification-${tags}`;
    const iconSvg = tags === 'success' 
      ? '<polyline points="20 6 9 17 4 12"></polyline>'
      : tags === 'error'
      ? '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'
      : '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>';

    const notificationHTML = `
      <div id="notification" class="${notificationClass} show">
        <div class="notification-content">
          <svg class="notification-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${iconSvg}
          </svg>
          <span class="notification-text">${messageText}</span>
        </div>
        <button class="notification-close" aria-label="Close notification">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = notificationHTML;
    const notification = tempDiv.firstElementChild;
    container.appendChild(notification);

    const closeButton = notification.querySelector('.notification-close');
    const autoHideDelay = 5000;

    function removeNotification() {
      notification.classList.remove('show');
      notification.classList.add('hide');
      setTimeout(() => notification.remove(), 300);
    }

    if (closeButton) {
      closeButton.addEventListener('click', removeNotification);
    }
    
    setTimeout(removeNotification, autoHideDelay);
  }

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();

      const productId = this.getAttribute('data-product-id');
      const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value || '';
      
      const formData = new FormData();
      formData.append('product_id', productId);
      if (csrfToken) formData.append('csrfmiddlewaretoken', csrfToken);

      const button = this;
      button.disabled = true;

      fetch('/cart/cart_add/', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': csrfToken,
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.messages && data.messages.length > 0) {
          data.messages.forEach(msg => {
            let messageText = msg.text;
            if (messageText.startsWith('msg_')) {
              const currentLang = localStorage.getItem('language') || 'en';
              const translations = window.translations?.[currentLang] || window.translations?.en || {};
              messageText = translations[msg.text] || msg.text;
            }
            displayMessage(messageText, msg.tags || 'success');
          });
        }
        button.disabled = false;
      })
      .catch(error => {
        console.error('Error:', error);
        displayMessage('Error adding product to cart', 'error');
        button.disabled = false;
      });
    });
  });

  document.querySelectorAll('.notification').forEach(notification => {
    const closeButton = notification.querySelector('.notification-close');
    const autoHideDelay = 5000;

    function removeNotification() {
      notification.classList.remove('show');
      notification.classList.add('hide');
      
      setTimeout(() => {
        notification.remove();
      }, 300);
    }

    if (closeButton) {
      closeButton.addEventListener('click', removeNotification);
    }

    if (notification.classList.contains('show')) {
      setTimeout(removeNotification, autoHideDelay);
    }
  });
});
