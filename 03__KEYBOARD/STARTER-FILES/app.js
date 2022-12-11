const keys = document.querySelectorAll('.piano a');

keys.forEach((el, i) => {
    el.addEventListener('click', function() {
        const audio = new Audio(`audio/key-${i + 1}.mp3`);
        audio.play();
    })
});