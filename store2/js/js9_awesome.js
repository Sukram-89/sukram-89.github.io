// Initialize variables
let purchase = 0;
let cash = 10000;
let product = 0;
const prodPrices = [0, 15, 23, 34, 4, 999, 4999, 399, 29, 299, 9500];
const prodMoms = [0, 3.75, 5.75, 8.5, 1, 249, 1249.75, 99.75, 7.24, 49.75, 2375];
const prodNames = ['', 'Apple', 'Banana', 'Orange', 'Grape', 'Bicycle', 'Samsung S5', 'Toy train', 'Cup of Coffee', 'Chair', 'TV'];
let numbOfItem;
let totalPrice;
let role;
let username;
let cart = [];

// Parse URL parameters
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    username = params.get('username');
    role = params.get('role');
    console.log("Username:", username, "Role:", role);  // For debugging
}

// Display username and set up role-based display
function setupUserDisplay() {
    if (username) {
        document.getElementById('usernameDisplay').innerText = `Welcome, ${username}!`;
    } else {
        console.warn("No username found in URL");  // Debugging message
    }
    if (role === 'business') {
        document.getElementById('vatSection').style.display = 'none'; // Hide VAT section for business users
    }
}

// Set the current product
function setProduct(selectedProduct) {
    product = parseInt(selectedProduct, 10);
    console.log("Selected product:", product);  // For debugging
}

// Add item to the cart
function addToCart() {
    numbOfItem = document.getElementById('buyAmount').value || 1;
    if (checkBuyParam(numbOfItem)) {
        totalPrice = numbOfItem * prodPrices[product];
        const vat = role === 'business' ? 0 : numbOfItem * prodMoms[product];
        const cartItem = {
            name: prodNames[product],
            quantity: numbOfItem,
            price: totalPrice,
            vat: vat
        };
        
        cart.push(cartItem);
        updateCartDisplay();
        document.getElementById('message').innerHTML = `Added ${numbOfItem} x ${prodNames[product]} to cart.`;
    }
}

// Update the cart display
function updateCartDisplay() {
    const cartTable = document.getElementById('cartItems');
    cartTable.innerHTML = ''; // Clear existing cart items

    let totalSum = 0;
    let totalVAT = 0;

    cart.forEach((item, index) => {
        totalSum += item.price;
        totalVAT += item.vat;

        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;
        row.appendChild(quantityCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = item.price;
        row.appendChild(priceCell);

        // Remove button
        const actionCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(index);
        actionCell.appendChild(removeButton);
        row.appendChild(actionCell);

        cartTable.appendChild(row);
    });

    // Display total values
    document.getElementById('totalSum').textContent = totalSum;
    document.getElementById('totalVAT').textContent = totalVAT;
    document.getElementById('grandTotal').textContent = totalSum + totalVAT;
}

// Remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from cart
    updateCartDisplay();
    document.getElementById('message').innerHTML = `Removed item from cart.`;
}

// Validate the purchase parameters
function checkBuyParam(quantity) {
    quantity = parseInt(quantity, 10);
    if (quantity <= 0) {
        document.getElementById('message').innerHTML = quantity < 0 ? 'Enter an amount higher than 0.' : "You can't buy 0 amount";
        return false;
    }
    if (isNaN(quantity)) {
        document.getElementById('message').innerHTML = 'Please enter a correct number';
        return false;
    }
    if (product === 0) {
        document.getElementById('message').innerHTML = 'Please select a product!';
        return false;
    }

    totalPrice = quantity * prodPrices[product];
    if (cash - totalPrice < 0) {
        document.getElementById('message').innerHTML = 'Insufficient funds!';
        return false;
    }

    return true;
}

// Initialize the page
window.onload = function() {
    getURLParams();
    setupUserDisplay();
    setRemainCash();
};
