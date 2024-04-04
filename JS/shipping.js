

// The following script comes from a couple users on Youtube.
// When I could not get the scripts to work with my site
// I then had to stich them together till it did
// Some functionality is still not correct


function updateTotals() {
    const products = JSON.parse(localStorage.getItem('products'));
    const subtotal = products.reduce((total, product) => total + product.price * product.quantity, 0);
    const shipping = document.getElementById('next-day').checked ? 20 : 0;
    const taxes = subtotal * 0.07; // 7% of subtotal
    const total = subtotal + shipping + taxes;

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" width="100"></td>
            <td>
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
            </td>
            <td>${product.quantity}</td>
        `;
        document.getElementById('cart-items').appendChild(row);
    });

    const summary = [
        { id: 'Subtotal', value: subtotal },
        { id: 'Shipping', value: shipping },
        { id: 'Taxes', value: taxes },
        { id: 'Total', value: total },
    ];

    summary.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.id}: $${item.value.toFixed(2)}`;
        document.getElementById('totals').appendChild(li);
    });
}

updateTotals();
