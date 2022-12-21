const todaysDate = new Date();
const todayMonthYear = todaysDate.toLocaleString('default', { month: 'long', year: 'numeric' });
console.log(todaysDate);
let firstDay = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1);
let lastDay = new Date(todaysDate.getFullYear(), todaysDate.getMonth() + 1, 0);

const wrapperElement = document.querySelector('.wrapper');
const monthLabel = document.querySelector('.month');
const prevButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');


const updateUI = function(curFirstDay, curLastDay) {
    const newMonthLabel = curFirstDay.toLocaleString('default', { month: 'long', year: 'numeric' });
    // Fill in Grid
    const emptyBegin = function() {
        let HTMLString = '';
        for (index = 0; index < firstDay.getDay(); index++) {
            HTMLString = HTMLString + `<div class="day"></div>`;
        }
        return HTMLString;
    }
    const insertDays = function() {
        let HTMLString = '';
        for (index = 1; index <= lastDay.getDate(); index++) {
            const isToday = todayMonthYear == newMonthLabel && todaysDate.getDate() == index;
            HTMLString = HTMLString + `<div ${ isToday ? 'class="today day"' : 'class="day"' }>${index}</div>`;
        }
        return HTMLString;
    }
    const emptyEnd = function() {
        let HTMLString = '';
        for (index = lastDay.getDay(); index < 6; index++) {
            HTMLString = HTMLString + `<div class="day"></div>`;
        }
        return HTMLString;
    }
    monthLabel.textContent = newMonthLabel;
    document.querySelectorAll('.day').forEach(el => el.remove());
    wrapperElement.insertAdjacentHTML('beforeend', emptyBegin());
    wrapperElement.insertAdjacentHTML('beforeend', insertDays());
    wrapperElement.insertAdjacentHTML('beforeend', emptyEnd());


}

updateUI(firstDay, lastDay);

nextButton.addEventListener('click', function() {
    let newYear, newMonth;
    if (firstDay.getMonth() == 11 ) {
        newMonth = 0;
        newYear = firstDay.getFullYear() + 1;
    } else {
        newMonth = firstDay.getMonth() + 1;
        newYear = firstDay.getFullYear();
    }
    firstDay = new Date(newYear, newMonth, 1);
    lastDay = new Date(newYear, newMonth + 1, 0);
    updateUI(firstDay, lastDay);
});

prevButton.addEventListener('click', function() {
    let newYear, newMonth;
    if (firstDay.getMonth() == 0 ) {
        newMonth = 11;
        newYear = firstDay.getFullYear() - 1;
    } else {
        newMonth = firstDay.getMonth() - 1;
        newYear = firstDay.getFullYear();
    }
    firstDay = new Date(newYear, newMonth, 1);
    lastDay = new Date(newYear, newMonth + 1, 0);
    updateUI(firstDay, lastDay);
});