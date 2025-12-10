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
