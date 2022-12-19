const toggleButtons = [...document.querySelectorAll('ul li a[role="button"]')];

toggleButtons.forEach(el => el.addEventListener('click', function(event) {
    event.preventDefault();
    const parentListItem = this.parentElement;
    const answer = parentListItem.querySelector('.answer');
    if (parentListItem.classList.contains('expand')) {
        answer.style = `height:0px;transition-delay:0s, 0s, 1s`;
        parentListItem.classList.remove('expand');
        this.ariaExpanded = 'false';
    } else {
        const answerSectionHeight = answer.scrollHeight;
        answer.style = `height:${answerSectionHeight}px;transition-delay:10ms, 10ms 0s`;
        parentListItem.classList.add('expand');
        this.ariaExpanded = 'true';
        
    }
}));

// Trigger Click Event on Spacebar if role=button
toggleButtons.forEach(el => el.addEventListener('keyup', function(event) {
    if (event.keyCode == 32) {
        event.target.click();
    }
}));

// Stop Document scroll on Spacebar keydown if role=button
toggleButtons.forEach(el => el.addEventListener('keydown', function(event) {
    if (event.keyCode == 32) {
        event.preventDefault();
    }
}));