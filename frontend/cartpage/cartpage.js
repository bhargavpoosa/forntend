const addProduct = async (username,password, prodId) => {
    try{
        const basicAuth = btoa(`${username}:${password}`);
        let add = await fetch(`http://localhost:8080/cart/add/${username}/${prodId}`,{method: 'POST', headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${basicAuth}`,
            'Accept': 'application/json' 
        }});
        if(add.ok){
            cart();
        }
    }
    catch(error){
        console.error("An error occurred:", error);
    }
}

const removeProduct = async (username, password, prodId) => {
    try{
        const basicAuth = btoa(`${username}:${password}`);
        let remove = await fetch(`http://localhost:8080/cart/remove/${username}/${prodId}`, {method: 'POST', headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${basicAuth}`,
            'Accept': 'application/json' 
        }});
        if(remove.ok){
            cart();
        }
    }
    catch(error){
        console.error("An error occurred:", error);
    }
}

const deleteProduct = async (username, password, prodId) => {
    try{
        const basicAuth = btoa(`${username}:${password}`);
        let isDeleted = await fetch(`http://localhost:8080/cart/${username}/${prodId}`,{method: 'POST', headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${basicAuth}`,
            'Accept': 'application/json' 
        }});
        if(isDeleted.ok){
            cart();
        }
    }
    catch(error){
        console.error("An error occurred:", error);
    }
}
const cart = async (event) => {
    const url = new URL(window.location.href);
    const username = url.searchParams.get("username");
    const password = url.searchParams.get("password");
    console.log("From Cart", username, password);

    var closeCart = document.getElementById("close-cart-link");
    var homeUrl = `../homepage/home.html?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    closeCart.href = homeUrl;
    try {
        const basicAuth = btoa(`${username}:${password}`);
        let response = await fetch(`http://localhost:8080/cart/${username}`,{method: 'GET', headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${basicAuth}`,
            'Accept': 'application/json' 
        }});
        if (response.ok) {
            const data = await response.json();
            console.log("Response: ", data);
            const cartList = document.getElementById('cart-items');
            const checkoutDetails = document.getElementById('checkout-details');
            cartList.innerHTML = '';
            checkoutDetails.innerHTML = '';
            let totalAmount = 0;

            data.forEach(cartItem => {
                    totalAmount += cartItem.quantity * cartItem.price;
                    const cartItemElement = document.createElement('div');
                    cartItemElement.classList.add('cart-item');
                        cartItemElement.innerHTML = `
                            <img src="${cartItem.imageUrl}" alt="${cartItem.productName}">
                            <div class="cart-details">
                                <h3>${cartItem.productName}</h3>
                                <p>Rs ${cartItem.price}</p>
                            </div>
                            <div class="incre-decre-btn">
                                <button class="decre-button" onclick="removeProduct('${username}','${password}','${cartItem.prod_id}')">-</button>
                                <span class="product-quantity">${cartItem.quantity}</span>
                                <button class="incre-button" onclick="addProduct('${username}','${password}','${cartItem.prod_id}')">+</button>
                            </div> 
                            <button class="delete-button" onclick="deleteProduct('${username}','${password}','${cartItem.prod_id}')">Remove</button>
                        `;
                        cartList.appendChild(cartItemElement);
                    });

            const checkoutItem = document.createElement('div');
            checkoutItem.classList.add('checkout');
            checkoutItem.innerHTML = `
                <div class="total-amount">
                    <h3 class="total-message">Total:</h3>
                    <h3 class="total-value">Rs ${totalAmount}</h3>
                </div>
                <div class="checkout-btn">
                    <a href="../checkoutpage/checkout.html?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}">Checkout</a>
                </div>`;
            checkoutDetails.appendChild(checkoutItem);
        } else {
            console.error("Failed to fetch data");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

document.addEventListener('DOMContentLoaded', cart);
