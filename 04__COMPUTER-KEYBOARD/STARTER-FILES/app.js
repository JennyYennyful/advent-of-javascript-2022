const keyButtons = [...document.querySelectorAll('.key:not(.utility)')];
let activeKey = document.querySelector('.key.jiggle');

const updateKey = function() {
    if (activeKey) activeKey.classList.remove('jiggle');
    const newKey = keyButtons[Math.floor(Math.random() * keyButtons.length)];
    newKey.classList.add('jiggle');
    activeKey = newKey;
};

updateKey();

document.addEventListener('keyup', (event) => {
    if (event.key.toUpperCase() == activeKey.dataset.key) {
        updateKey();
    }
});