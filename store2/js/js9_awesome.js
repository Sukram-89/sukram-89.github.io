// Initialize variables
let purchase = 0;
let cash = 10000; 6,8
let product = 0;
const prodPrices = [0, 15, 23, 34, 4, 999, 4999, 399, 29, 299, 9500];
const prodMoms = [0, 3, 4.7, 8.5, 0.8, 199.8, 999.8, 79, 5.8, 59.8, 1900];
const prodNames = ['', 'Apple', 'Banana', 'Orange', 'Grape', 'Bicycle', 'Samsung S5', 'Toy train', 'Cup of Coffee', 'Chair', 'TV'];
let numbOfItem;
let totalPrice;
let role;
let username;
let cart = [];

// Parse URL parameters
// Retrieve values from cookies
function getCookieParams() {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return decodeURIComponent(parts.pop().split(';').shift());
        }
        return null;
    }

    username = getCookie('username');
    role = getCookie('role');

    console.log("Username:", username, "Role:", role);  // For debugging
}

// Display username and set up role-based display
function setupUserDisplay() {
    if (username) {
        document.getElementById('usernameDisplay').innerText = `User: ${username}`;
    } else {
        document.getElementById('usernameDisplay').innerText = `Test user`;
        document.getElementById('logout-button').style.display = 'none';
        console.warn("No username found in URL");  // Debugging message
    }

    // If the user is a business user, hide VAT section and adjust prices in the price table
    if (role === 'business') {
        document.getElementById('vatSection').style.display = 'none'; // Hide VAT section for business users
        document.getElementById('vat-message').innerText = 'Prices shown are without VAT.'; // Hide VAT section for business users
        // Update price table to show prices without VAT
        const productList = document.getElementById('productList').children;
        for (let i = 0; i < prodPrices.length - 1; i++) {
            const priceCell = productList[i].children[1];
            priceCell.textContent = (prodPrices[i + 1] / 1.25).toFixed(2); // Adjust for business users
        }
    }
}

// Set the current product
function setProduct(selectedProduct) {
    product = parseInt(selectedProduct, 10);
    console.log("Selected product:", product);  // For debugging
}
// Add item to the cart
function addToCart() {
    numbOfItem = parseInt(document.getElementById('buyAmount').value) || 1;

    if (checkBuyParam(numbOfItem)) {
        // Calculate total price, excluding VAT for business users
        const productPrice = role === 'business' ? prodPrices[product] / 1.25 : prodPrices[product];
        totalPrice = numbOfItem * productPrice;
        const vat = role === 'business' ? 0 : numbOfItem * prodMoms[product];
        const productName = prodNames[product];

        // Check if the item already exists in the cart
        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            // Update the existing item
            existingItem.quantity += numbOfItem;
            existingItem.price += totalPrice;
            existingItem.vat += vat;
        } else {
            // Add a new item to the cart
            const cartItem = {
                name: productName,
                quantity: numbOfItem,
                price: totalPrice,
                vat: vat
            };
            cart.push(cartItem);
        }

        updateCartDisplay();
        document.getElementById('message').innerHTML = `Added ${numbOfItem} x ${productName} to cart.`;
    }
}
function updateCartDisplay() {
    const cartTable = document.getElementById('cartItems');
    cartTable.innerHTML = ''; // Clear existing cart items

    let totalSum = 0;
    let totalVAT = 0;

    cart.forEach((item, index) => {
        totalSum += item.price;
        if (role !== 'business') totalVAT += item.vat;

        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.setAttribute('data-testid', `${item.name}-receipt-name`);
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const quantityCell = document.createElement('td');
        quantityCell.setAttribute('data-testid', `${item.name}-receipt-quantity`);
        quantityCell.textContent = item.quantity;
        row.appendChild(quantityCell);

        const priceCell = document.createElement('td');
        priceCell.setAttribute('data-testid', `${item.name}-receipt-price`);
        priceCell.textContent = item.price;
        row.appendChild(priceCell);

        // Remove button
        const actionCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.setAttribute('data-testid', `${item.name}-remove-button`);
        removeButton.setAttribute('class', `btn btn-secondary`);
        removeButton.onclick = () => removeFromCart(index);
        actionCell.appendChild(removeButton);
        row.appendChild(actionCell);

        cartTable.appendChild(row);
    });

    // Display total values
    document.getElementById('totalSum').textContent = totalSum;
    document.getElementById('totalVAT').style.display = role === 'business' ? 'none' : 'block';
    document.getElementById('totalVAT').textContent = totalVAT;
    document.getElementById('grandTotal').textContent = totalSum;
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

// Display remaining cash
function setRemainCash() {
    document.getElementById('money').innerHTML = cash;
}

// Function to open the purchase modal
function finalizePurchase() {
    // Reset modal fields
    document.getElementById('buyerName').value = '';
    document.getElementById('buyerAddress').value = '';
    document.getElementById('finalReceipt').style.display = 'none';
    document.getElementById('userDetails').style.display = 'block';

    // Show the modal
    $('#purchaseModal').modal('show');
}

// Function to confirm purchase, show receipt, and deduct amount
function confirmPurchase() {
    const buyerName = document.getElementById('buyerName').value.trim();
    const buyerAddress = document.getElementById('buyerAddress').value.trim();

    if (buyerName && buyerAddress) {
        // Hide input fields and show receipt
        document.getElementById('userDetails').style.display = 'none';
        document.getElementById('finalReceipt').style.display = 'block';

        // Populate receipt details
        const receiptItems = document.getElementById('receiptItems');
        receiptItems.innerHTML = '';
        let totalSum = 0;
        let totalVAT = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.quantity} x ${item.name} - $${item.price}`;
            receiptItems.appendChild(listItem);

            totalSum += item.price;
            totalVAT += item.vat;
        });

        const grandTotalWithBug = totalSum + totalVAT*0.95;
        let grandTotal = Math.floor(grandTotalWithBug);
        document.getElementById('name').textContent = `Thank you for your purchase, ${buyerName}`;
        document.getElementById('address').textContent = `It will be shipped to: ${buyerAddress}`;
        document.getElementById('receiptTotal').textContent = `$${totalSum}`;
        document.getElementById('receiptVAT').textContent = `$${totalVAT}`;
        document.getElementById('receiptGrandTotal').textContent = `$${grandTotal}`;

        // Deduct from money
        cash -= grandTotal;
        setRemainCash();

        // Clear cart and update display
        cart = [];
        updateCartDisplay();

        // Change the button to close the modal after confirmation
        document.getElementById('confirmPurchaseButton').textContent = 'Close';
        document.getElementById('confirmPurchaseButton').onclick = function() {
            $('#purchaseModal').modal('hide');
            document.getElementById('confirmPurchaseButton').textContent = 'Confirm Purchase';
            document.getElementById('confirmPurchaseButton').onclick = confirmPurchase;
        };
    } else {
        alert("Please enter your Name and Address.");
    }
}

function logout() {
    // Delete cookies by setting their values to empty and expiring them
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Redirect to the logout page
    window.location.href = 'https://hoff.is/cookies';
}

// Initialize the page
window.onload = function() {
    getCookieParams();
    setupUserDisplay();
    setRemainCash();
};
