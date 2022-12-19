const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const pageWrapper = document.querySelector('.wrapper');
const triggerButton = document.getElementById('something');
const closeButton = document.querySelector('.close');

const openModal = function(event) {
    event.preventDefault()
    overlay.classList.remove('hidden');
    closeButton.focus();
    pageWrapper.ariaHidden = true;
    // Trap Focus inside modal
    pageWrapper.querySelectorAll('a, button').forEach(el => el.tabIndex = -1);
}

const closeModal = function() {
    overlay.classList.add('hidden');
    triggerButton.focus();
    pageWrapper.ariaHidden = false;
    pageWrapper.querySelectorAll('a, button').forEach(el => el.tabIndex = 0);
    
}


triggerButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);

overlay.addEventListener('click', function(event){
    if (event.target.classList.contains('overlay')) {
        closeModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && !overlay.classList.contains('hidden')) {
        closeModal();
    }
})