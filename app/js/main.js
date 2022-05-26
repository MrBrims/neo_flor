// Появление меню при прокрутке

function scrollHeader() {
  const headerFixed = document.querySelector('.header')

  if (this.scrollY >= 50) headerFixed.classList.add('scroll-header');
  else headerFixed.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


// Парралакс элементов при движении мыши

new Parallax(document.getElementById('scene'));
new Parallax(document.getElementById('scene2'));
new Parallax(document.getElementById('scene3'));


// Слайдер в шапке

let mySwiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  effect: "fade",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Добавление второй пагинации фракция к слайдеру

let mySliderAllSlides = document.querySelector('.hero__bottom-total');
let mySliderCurrentSlide = document.querySelector('.hero__bottom-current');

mySliderAllSlides.innerHTML = mySwiper.slides.length - 2;

mySwiper.on('slideChange', function () {
  let currentSlide = ++mySwiper.realIndex;
  mySliderCurrentSlide.innerHTML = currentSlide;
});


// Слайдер для классической коллекции

let mySwiper2 = new Swiper(".classicSlider", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  loop: true,
  spaceBetween: 10,
  pagination: {
    el: ".classic__pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".classic__button-next",
    prevEl: ".classic__button-prev",
  },
  breakpoints: {
    450: {
      slidesPerView: 2,
    },
    700: {
      slidesPerView: 3,
    },
    900: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
    1500: {
      slidesPerView: 6,
    }, 
  },
});

// Слайдер отзывов

let mySwiper3 = new Swiper(".reviews__gallery", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".reviews__gallery-next",
    prevEl: ".reviews__gallery-prew",
  },
  breakpoints: {
    500: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

// Попап

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});

(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();
(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();

// Видео с ютуба

new ModalVideo('.js-modal-btn');

// Включение подсветки флорариума

const switchLight = document.querySelector('.specs__structure-switch');
const swithcImgLight = document.querySelector('.specs__img-box')

switchLight.addEventListener('click', ()=> {
  switchLight.classList.toggle('--active');
  swithcImgLight.classList.toggle('--active');
});

// Аккордеон

const accordionFaq = document.querySelectorAll('.faq__accordion-question').forEach((el) => {
  el.addEventListener('click', () => {

    let accordionAnswer = el.nextElementSibling;

    if (accordionAnswer.style.maxHeight) {
      document.querySelectorAll('.faq__accordion-answer').forEach((el) => el.style.maxHeight = null)
      document.querySelectorAll('.faq__accordion-question').forEach((el) => el.classList.remove('--active'))
    } else {
      document.querySelectorAll('.faq__accordion-answer').forEach((el) => el.style.maxHeight = null)
      document.querySelectorAll('.faq__accordion-question').forEach((el) => el.classList.remove('--active'))
      accordionAnswer.style.maxHeight = accordionAnswer.scrollHeight + 'px'
      el.classList.add('--active')
    }
  })
});

// Меню бургер

const menuIcon = document.querySelector('.header__bottom-btn');
const menuBurger = document.querySelector('.nav');
if (menuIcon) {
  menuIcon.addEventListener("click", function (e) {
    menuIcon.classList.toggle('--active');
    menuBurger.classList.toggle('--active');
  });
}

// Плавная прокрутка

const menuLinks = document.querySelectorAll('.go-to[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}

// Активный пункт меню

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav__link').forEach((link) => {
        link.classList.toggle(
          '--active',
          link.getAttribute('href').replace('#', '') === entry.target.id
        );
      });
    }
  });
}, {
  threshold: 0.5,
});

document.querySelectorAll('section').forEach(
  (section) => observer.observe(section),
);



