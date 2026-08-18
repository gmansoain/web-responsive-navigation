const mobileMenuToggle = document.querySelector('.mobile-menu-toggle')
const mobileMenuItems = document.querySelector('.mobile-menu-items')

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuItems.classList.toggle('mobile-hide')
})