'use strict';


const startButton = document.querySelector('.start');
const settingsButton = document.querySelector('.settings');
const minutesInput = document.querySelector('.minutes input');
const secondsInput = document.querySelector('.seconds input');
const ring = document.querySelector('.ring');

let timer;

const startTimer = function() {
    startButton.disabled = false;
    const tick = function() {
        // Print remaining time to UI
        minutesInput.value = String(Math.trunc(totalSeconds / 60)).padStart(2,0);
        secondsInput.value = String(Math.trunc(totalSeconds % 60)).padStart(2,0);

        // When 0 Seconds, stop timer
        if (totalSeconds === 0){
            clearInterval(timer);
            ring.classList.add('ending');
            setTimeout(function() {
                alert('Timer Completed');
            }, 1000);
            startButton.textContent = 'Completed';
            startButton.disabled = true;
        }

        totalSeconds--;

    }
    // Set total time in seconds
    let totalSeconds = (Number(minutesInput.value) * 60) + Number(secondsInput.value);

    // Call the timer every second
    tick();
    timer = setInterval(tick, 1000);
    return timer;
}

const openSettings = function() {
    startButton.style.visibility = 'hidden';
    minutesInput.disabled = false;
    secondsInput.disabled = false;
}

const closeSettings = function() {
    startButton.style.visibility = 'visible';
    minutesInput.disabled = true;
    secondsInput.disabled = true;
}

// Event Handlers
startButton.addEventListener('click', function() {
    if (this.classList.contains('running')) {
        clearInterval(timer);
        this.classList.remove('running');
        this.textContent = 'start';
    } else {
        startTimer();
        this.classList.add('running');
        this.textContent = 'stop';
    }
    
});

settingsButton.addEventListener('click', function() {
    if (this.classList.contains('editing')) {
        closeSettings();
        this.classList.remove('editing');
        this.querySelector('img').src = 'images/gear.svg';
    } else {
        openSettings();
        clearInterval(timer);
        this.classList.add('editing');
        this.querySelector('img').src = 'images/check.svg';
        if (startButton.classList.contains('running')) startButton.click();
    }
})