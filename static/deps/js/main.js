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

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();

      const productId = this.getAttribute('data-product-id');
      const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
      
      const formData = new FormData();
      formData.append('product_id', productId);
      formData.append('csrfmiddlewaretoken', csrfToken);

      fetch('/cart/cart_add/', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': csrfToken,
        }
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error adding to cart');
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
