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
