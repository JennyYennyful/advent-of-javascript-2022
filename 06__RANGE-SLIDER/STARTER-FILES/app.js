const rangeInput = document.querySelector('#priceRange');
const rangeLabel = document.querySelector('.dollars');

rangeInput.addEventListener('input', (e) => {
    // change price in cents to dollars, update UI
    const priceInUSDollars = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(e.target.value/100);
    console.log(priceInUSDollars);
    rangeLabel.textContent = priceInUSDollars;
});