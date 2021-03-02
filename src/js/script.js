window.onload = () => {
  /* Contacts spoiler */
  console.log('loaded');
  const
    contactsBtn = document.querySelector('.contacts__spoiler-btn'),
    contacts = document.querySelector('.header__contacts'),
    supHeader = document.querySelector('.header__sup')

  const supHeaderInitialHeight = window.getComputedStyle(supHeader, null)
    .getPropertyValue('height')

  contactsBtn.onclick = () => {
    
    contactsBtn.classList.toggle('contacts__spoiler-btn_active')

    if (contacts.classList.contains('contacts_visible')) {
      supHeader.style.height = supHeaderInitialHeight
    }
    else {
      supHeader.style.height = 
        +supHeaderInitialHeight.replace('px', '') 
        + contacts.scrollHeight + 'px'
    }

  }

  /* Burger-menu */

  const
    burgerBtn = document.querySelector('.navbar__burger-btn'),
    nav = document.querySelector('.navbar__nav')

  burgerBtn.onclick = () => {

    burgerBtn.classList.toggle('navbar__burger-btn_active')

    document.body.classList.toggle('no-overflow')

  }
}