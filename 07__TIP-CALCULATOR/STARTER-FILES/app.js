const billAmount = document.getElementById('bill-amount');
const numberOfPeopleInput = document.getElementById('number-of-people');
const percentageRadios = [...document.querySelectorAll('.tip-percentages input[type="radio"]')];
const calculateButton = document.getElementById('calculate');
const tipAmountText = document.getElementById('tip-amount');
const totalPerPersonText = document.getElementById('total-per-person');

const calcTipAmount = function(rate, bill) {
    const tipAmount = bill * rate;
    return tipAmount;
}
const calcTotalPerPerson = function(tip, billTotal, numPeople) {
    return (billTotal + tip) / numPeople;
}
const formatCurrency = function(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price).slice(1);
}

calculateButton.addEventListener('click', () => {
    const bill = Number(billAmount.value);
    const numPeople = Number(numberOfPeopleInput.value);
    const tipRate = Number(percentageRadios.find(el => el.checked == true).value.slice(0, -1)) / 100;

    // Calculate Numbers
    const tip = calcTipAmount(tipRate, bill);
    const totalPerPerson = calcTotalPerPerson(tip, bill, numPeople);

    // Update UI
    tipAmountText.textContent = formatCurrency(tip);
    totalPerPersonText.textContent = formatCurrency(totalPerPerson);
});