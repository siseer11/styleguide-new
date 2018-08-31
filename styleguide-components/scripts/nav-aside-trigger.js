const navAsideTrigger = () => {
  const menuBurger = document.querySelector('.nav-burger');
  const pageWrapper = document.querySelector('.gb-page-wrapper');
  const navAside = document.querySelector('.gb-nav-aside')
  const blackOverlay = document.querySelector('.gb-page-black-overlay');
  const navAsideCloseBtn = document.querySelector('.nav-aside-close');

  menuBurger.addEventListener('click' , (e) => {
    pageWrapper.classList.add('translated');
    navAside.classList.add('translated');
  })

  const removeTranslated = () =>{
    pageWrapper.classList.remove('translated');
    navAside.classList.remove('translated');
  }

  blackOverlay.addEventListener('click' ,removeTranslated);
  navAsideCloseBtn.addEventListener('click' ,removeTranslated);
}

navAsideTrigger();