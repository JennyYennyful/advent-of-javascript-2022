// Users should be able to: 

// type in a digit and automatically be taken to the next input
// paste in a 4 digit code


const textInputs = [...document.querySelectorAll('.fields input')];

const verify = function() {
    const passcode = textInputs.map(el => el.value).join('');
    console.log(`Verify "${passcode}"`);
}

textInputs.forEach(el => el.addEventListener('input', (e) => {
    const nextInput = e.target.nextElementSibling;
    if (!e.target.value) return;
    if (nextInput) {
        nextInput.focus();
    } else {
        verify();
    }
}));

textInputs[0].addEventListener('paste', (e) => {
    e.preventDefault();
    const clipboardArray = (e.clipboardData || window.clipboardData).getData('text').split('').slice(0,4);
    textInputs.forEach((el, index) => el.value = clipboardArray[index]);
    textInputs[3].focus();  
    verify();  
});