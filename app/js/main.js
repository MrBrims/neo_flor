// Появление меню при прокрутке

function scrollHeader() {
  const headerFixed = document.querySelector('.header')

  if (this.scrollY >= 500) headerFixed.classList.add('scroll-header'); 
  else headerFixed.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


// Парралакс элементов при скролле

let rellax = new Rellax('.rellax');