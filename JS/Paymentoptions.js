
// The following script comes from a couple users on Youtube.
// When I could not get the scripts to work with my site
// I then had to stich them together till it did
// Some functionality is still not correct


const products = [
    {
        id: 1,
        image: '../images/smegtoaster.png',
        name: 'Smeg Toaster',
        description: 'This is a great product.',
        price: 19.99,
        quantity: 1
    },
    {
        id: 2,
        image: '../images/smegicecreammaker.png',
        name: 'Smeg Ice cream Maker',
        description: 'This is a great product.',
        price: 19.99,
        quantity: 1
    },
    // ... more products
];

// Update the cart
const cartTable = document.getElementById('cart');
products.forEach((product, index) => {
    const row = cartTable.insertRow();
    const imgCell = row.insertCell(0);
    const descCell = row.insertCell(1);
    const quantityCell = row.insertCell(2);
    
    const img = document.createElement('img');
    img.src = product.image;
    imgCell.appendChild(img);
    
    const name = document.createElement('p');
    name.textContent = product.name;
    const description = document.createElement('p');
    description.textContent = product.description;
    const price = document.createElement('p');
    price.textContent = product.price;
    descCell.appendChild(name);
    descCell.appendChild(description);
    descCell.appendChild(price);
    
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = 0;
    quantityInput.value = product.quantity;
    quantityInput.addEventListener('change', (event) => {
        product.quantity = parseInt(event.target.value);
        updateLocalStorage(product.id, product.quantity);
        updateTotals();
    });
    quantityCell.appendChild(quantityInput);
});

function updateLocalStorage(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart) cart = {};
    cart[productId] = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Calculate totals
function updateTotals() {
    let subtotal = 0;
    products.forEach(product => {
        subtotal += product.price * product.quantity;
    });
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('shipping').textContent = (subtotal * 0.05).toFixed(2); // 5% of subtotal
    document.getElementById('taxes').textContent = (subtotal * 0.1).toFixed(2); // 10% of subtotal
    document.getElementById('total').textContent = (subtotal * 1.15).toFixed(2); // Subtotal + shipping + taxes
}

updateTotals();

// Next Step and Cancel button
document.getElementById('next').addEventListener('click', () => {
    window.location.href = 'shippingdetails.html'; // Replace this with your own URL
});
document.getElementById('cancel').addEventListener('click', () => {
    window.location.href = '/index.html';
});
