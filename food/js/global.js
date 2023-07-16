/* ==== GENERAL SETTING */
let linkdatabase = "https://script.google.com/macros/s/AKfycbybPXXhGj6ObLYmxbdnIa2cbiircfVfpOmlxJDC58tbRmI-qjgylokXLaf1jAIm73Sszg/exec";
let nomorAdmin = "6289677337414";

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
  })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu')
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
  const header = document.getElementById('header')
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  this.scrollY >= 50 ? header.classList.add('bg-header') :
    header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up')
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
  this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') :
    scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollY = window.pageYOffset

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id'),
      sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link')
    } else {
      sectionsClass.classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button 
themeButton.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  // We save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})

/* ==== SHOW PRODUCT */
var linkdata = linkdatabase + "?action=readproduk";
$.getJSON(linkdata, function(data) {
  if (data){
    var json = data.records;
    var html = "";
    for (i=0; i < json.length; i++){
      var image = json[i]['Gambar Produk'];
      var nama = json[i]['Nama Produk'];
      var harganormal = json[i]['Harga'];
      var dataDiskon = json[i]['Diskon'];
      var keterangan = json[i]['Keterangan'];
      var status = json[i]['Status'];
      var diskon = dataDiskon*1;
      console.log(diskon);
      var harga = harganormal*1;
      if (diskon < 100) {
        var hitungdiskon = Math.round((harga * diskon) / 100);
      } else if (diskon > 101) {
        var hitungdiskon = diskon;
      }
      var price = harga - hitungdiskon;
      var strike = harga;
      if (diskon != null && diskon != 0) {
        var htmlprice = '<div class="popular-price"><span class="item_price">'+price+'</span><span class="strike">'+strike+'</span></div>';
        if (diskon < 100) {
          var htmldiskon = '<div class="diskon">'+diskon+'%</div>';
        } else {
          var htmldiskon = "";
        }
      } else {
        var htmlprice = '<div class="popular-price"><span class="item_price">'+price+'</span></div>';
        var htmldiskon = "";
      }
      if (status == "off"){
        var tombol = '<button class="popular-button">Habis</button>';
      } else {
        var tombol = '<a href="javascript:;" class="item_add"><i class="ri-shopping-bag-line"></i></a>';
      }
      html += '<article class="popular-card">';
      html += '<img class="popular-image" src="'+image+'" alt="'+nama+'" width="230" height="230"/>';
      html += '<h3 class="popular-name">'+nama+'</h3>';
      html += '<div class="popular-description">'+keterangan+'</div>';
      html += htmlprice;
      html += htmldiskon;
      html += tombol;
      html += '</article>';
    }
    $("#htmlproduk").html(html);
  }
});
