const menuItems = [
    {
        name: 'French Fries with Ketchup',
        price: 223,
        image: 'plate__french-fries.png',
        alt: 'French Fries',
        count: 0
    },
    {
        name: 'Salmon and Vegetables',
        price: 512,
        image: 'plate__salmon-vegetables.png',
        alt: 'Salmon and Vegetables',
        count: 0
    },
    {
        name: 'Spaghetti with Meat Sauce',
        price: 782,
        image: 'plate__spaghetti-meat-sauce.png',
        alt: 'Spaghetti with Meat Sauce',
        count: 0
    },
    {
        name: 'Bacon, Eggs, and Toast',
        price: 599,
        image: 'plate__bacon-eggs.png',
        alt: 'Bacon, Eggs, and Toast',
        count: 0
    },
    {
        name: 'Chicken Salad with Parmesan',
        price: 698,
        image: 'plate__chicken-salad.png',
        alt: 'Chicken Salad with Parmesan',
        count: 0
    },
    {
        name: 'Fish Sticks and Fries',
        price: 634,
        image: 'plate__fish-sticks-fries.png',
        alt: 'Fish Sticks and Fries',
        count: 0
    }
]

/////////////////////////////////////////////////
// Elements
const addToCartButtons = document.querySelectorAll('.menu li button');
const cartSummary = document.querySelector('.cart-summary');
const cartSubtotal = document.querySelector('.price.subtotal');
const cartTax = document.querySelector('.price.tax');
const cartTotal = document.querySelector('.price.total');
const emptyMessage = document.querySelector('.empty');

console.log(addToCartButtons);


/////////////////////////////////////////////////
// Functions
const formatUSD = function(price) {
    const dollars = price/100;
    const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(dollars);
    return currency;
}

const calcCartTotal = function() {
    const subtotal = menuItems.reduce(
        (acc, current) => acc + (current.price * current.count), 0
    )
    const taxRate = 0.0975;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    cartSubtotal.textContent = formatUSD(subtotal);
    cartTax.textContent = formatUSD(tax);
    cartTotal.textContent = formatUSD(total);
}

const updateButton = function(button, currentItem) {
    if (currentItem.count > 0) {
        button.classList.replace('add', 'in-cart');
        button.disabled = true;
        button.innerHTML = '<img src="images/check.svg" alt="Check">In Cart';
    } else {
        button.classList.replace('in-cart', 'add');
        button.disabled = false;
        button.innerHTML = 'Add to Cart';
    }
}

const getClosestMenuItem = function(button) {
    const menuItemName = button.closest('li').querySelector('.menu-item').textContent;
    return menuItems.find(el => el.name == menuItemName);
}

calcCartTotal();

/////////////////////////////////////////////////
// Event Handlers

for (button of addToCartButtons) {
    button.addEventListener('click', function(e) {
        const currentItem = getClosestMenuItem(this);
        const html = `
            <li>
                <div class="plate">
                    <img src="images/${currentItem.image}" alt="${currentItem.alt}" class="plate" />
                    <div class="quantity">1</div>
                </div>
                <div class="content">
                    <p class="menu-item">${currentItem.name}</p>
                    <p class="price">${formatUSD(currentItem.price)}</p>
                </div>
                <div class="quantity__wrapper">
                    <button class="decrease">
                    <img src="images/chevron.svg" />
                    </button>
                    <div class="quantity">1</div>
                    <button class="increase">
                    <img src="images/chevron.svg" />
                    </button>
                </div>
                <div class="subtotal">
                    ${formatUSD(currentItem.price)}
                </div>
                </li>
        `;
        currentItem.count++;
        cartSummary.insertAdjacentHTML('beforeend', html);
        calcCartTotal();
        emptyMessage.style.display = 'none';
        updateButton(this, currentItem);

    });
}

// Adding event handler to parent list, for increase/decrease buttons
document.querySelector('.cart-summary').addEventListener('click', function(e) {
    const target = e.target.closest('button');
    if (target) {
        const currentItem = getClosestMenuItem(target);
        if (target.classList.contains('increase')) {
            currentItem.count++;
        } else if (target.classList.contains('decrease')) {
            currentItem.count--;
            if (currentItem.count === 0) {
                target.closest('li').remove();
                const buttonSelector = `button[data-item-name="${currentItem.name}"`;
                updateButton(document.querySelector(buttonSelector), currentItem);
                if (!menuItems.find(curr => curr.count > 0)) {
                    emptyMessage.style.display = 'block';
                    
                }
            }
        }
        const subtotal = currentItem.price * currentItem.count;
        target.closest('li').querySelector('.subtotal').textContent = formatUSD(subtotal)
        const quantityLabels = target.closest('li').querySelectorAll('.quantity');
        quantityLabels.forEach(element => {
            element.textContent = currentItem.count;
        });
        calcCartTotal();
    }
});