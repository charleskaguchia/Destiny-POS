// 1. Update Date and Time
// function updateDateTime() {
//     const now = new Date();
//     const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
//     const timeOptions = { hour: '2-digit', minute: '2-digit' };
    
//     document.getElementById('date').innerText = now.toLocaleDateString('en-US', dateOptions);
//     document.getElementById('time').innerText = now.toLocaleTimeString('en-US', timeOptions);
// }
// setInterval(updateDateTime, 1000);
// updateDateTime();

//Date and Time Object
function checkTime(){
    let dateObj = new Date();//create date object
    let months= ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let monthNum = dateObj.getMonth();//the month is paired with Num so that it can be
        let dateCal = dateObj.getDate();//day of the month
        let year = dateObj.getFullYear();//year
        let hours = dateObj.getHours();//hours
        let minutes = dateObj.getMinutes();//minutes
        let seconds = dateObj.getSeconds();//seconds

        console.log(months[monthNum] + ',' + dateCal + ' ' + year +' '+ hours +':'+ minutes +':'+ seconds +' '+ 'AM');//log month number to console for testing
}

function to12HourFormat(time){
    time = 24;
    am_pm ='AM'
    if (time > 12) {
        time = time - 12;
        am_pm ='PM'
    }
    console.log(time);
}

// Call the function to set the initial date and time
checkTime();
to12HourFormat();

// 2. Category Interaction (Visual Only)
const categories = document.querySelectorAll('.category-item');
categories.forEach(category => {
    category.addEventListener('click', function() {
        categories.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
    });
});

// 3. Add to Cart Logic
const itemCards = document.querySelectorAll('.item-card');
const orderList = document.getElementById('orderList');
const emptyMsg = document.getElementById('emptyMsg');

itemCards.forEach(card => {
    card.addEventListener('click', () => {
        // Visual feedback
        card.style.transform = "scale(0.95)";
        setTimeout(() => card.style.transform = "scale(1)", 100);

        // Get data from clicked item
        const itemName = card.getAttribute('data-name');
        const itemPrice = parseFloat(card.getAttribute('data-price'));

        addItemToCart(itemName, itemPrice);
    });
});

function addItemToCart(name, price) {
    // Hide empty message if it exists
    if(emptyMsg) emptyMsg.style.display = 'none';

    // Check if item already exists in the cart
    const existingItem = Array.from(orderList.children).find(item => 
        item.getAttribute('data-name') === name
    );

    if (existingItem) {
        // Item exists: Update Quantity and Price
        let quantitySpan = existingItem.querySelector('.item-quantity');
        let currentQty = parseInt(quantitySpan.innerText);
        let newQty = currentQty + 1;
        
        quantitySpan.innerText = newQty;
        
        // Update the displayed price for this row (Price * Qty)
        let priceTag = existingItem.querySelector('.price-tag');
        let newTotalPrice = (price * newQty).toFixed(2);
        priceTag.innerText = `$${newTotalPrice}`;
        
        // Update the data attribute for total calculation
        existingItem.setAttribute('data-total-price', newTotalPrice);

    } else {
        // Item does not exist: Create new row
        const newItem = document.createElement('div');
        newItem.classList.add('order-item');
        newItem.setAttribute('data-name', name);
        newItem.setAttribute('data-price', price); // Unit price
        newItem.setAttribute('data-total-price', price); // Current total price
        
        newItem.innerHTML = `
            <div class="item-details">
                <h4>${name}</h4>
                <span>Quantity: <span class="item-quantity">1</span></span>
            </div>
            <div class="item-price-action">
                <span class="price-tag">$${price.toFixed(2)}</span>
                <i class="fa-regular fa-circle-xmark remove-btn"></i>
            </div>
        `;
        
        orderList.appendChild(newItem);
    }

    calculateTotal();
}

// 4. Remove Item Functionality
orderList.addEventListener('click', function(event) {
    // Check if the clicked element is the remove button
    if (event.target.classList.contains('remove-btn')) {
        const itemToRemove = event.target.closest('.order-item');
        
        // Add fade out animation class if you want, or just remove
        itemToRemove.remove();
        
        // Show empty message if list is empty
        if(orderList.children.length === 0 || (orderList.children.length === 1 && orderList.children[0].id === 'emptyMsg')) {
            if(emptyMsg) emptyMsg.style.display = 'block';
        }

        calculateTotal();
    }
});

// 5. Calculate Total Amount
function calculateTotal() {
    let total = 0;
    const items = document.querySelectorAll('.order-item');
    
    items.forEach(item => {
        // We use the data-total-price attribute which tracks (Unit Price * Qty)
        const itemTotal = parseFloat(item.getAttribute('data-total-price'));
        if (!isNaN(itemTotal)) {
            total += itemTotal;
        }
    });

    document.getElementById('totalAmount').innerText = `$${total.toFixed(2)}`;
}

// 6. Add Customer Button
function addCustomer() {
    const name = prompt("Enter Customer Name:");
    if(name) {
        alert(`Customer ${name} added to order!`);
    }
}