"use strict";var contactsBtn=document.querySelector(".contacts__spoiler-btn"),contacts=document.querySelector(".header__contacts"),supHeader=document.querySelector(".header__sup"),supHeaderInitialHeight=window.getComputedStyle(supHeader,null).getPropertyValue("height");contactsBtn.onclick=function(){contactsBtn.classList.toggle("contacts__spoiler-btn_active"),contacts.classList.contains("contacts_visible")?supHeader.style.height=supHeaderInitialHeight:supHeader.style.height=+supHeaderInitialHeight.replace("px","")+contacts.scrollHeight+"px"};var burgerBtn=document.querySelector(".navbar__burger-btn"),nav=document.querySelector(".navbar__nav");burgerBtn.onclick=function(){burgerBtn.classList.toggle("navbar__burger-btn_active"),document.body.classList.toggle("no-overflow")};