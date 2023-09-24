const placeOrder = document.querySelector('#placeOrder');
const saveOrder = async (event, username, password) => {
    try{
        event.preventDefault();
        console.log('hi');
        const cartProducts = await fetch(`http://localhost:8080/cart/${username}`);
        let productList = "";
        let totalAmount = 0;
        if(cartProducts.ok){
            const cartItems = await cartProducts.json();
            cartItems.forEach(cart => {
                productList+=cart.prod_id + ",";
                totalAmount+=cart.price * cart.quantity;
            })
        }
        console.log(totalAmount);
        console.log(productList);
        const response = await fetch("http://localhost:8080/cart/order",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ totalAmount, productList, username})
          });
        if(response.ok){
            alert("Order Placed");
            const homePageUrl = `../homepage/home.html?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
            window.location.href = homePageUrl;
        }
    }
    catch(error){
        console.log(error);
    }
}
const checkout = async (username) => {
    try{
        let Amount = 0;
        const total = document.getElementById('total');
        const response = await fetch(`http://localhost:8080/cart/${username}`);
        if(response.ok){
            const data = await response.json();
            console.log(data);
            data.forEach(cart => {
                Amount+=cart.price * cart.quantity;
            });
        
            const amountHeader = document.createElement('h3');
            amountHeader.classList.add('total-value');
            amountHeader.innerHTML = `
                    <h3 class="total-value">Rs ${Amount}</h3>
                `;
            total.appendChild(amountHeader);
        }

    }
    catch(error){
        console.log(error);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const username = url.searchParams.get("username");
    const password = url.searchParams.get("password");
    console.log("From Checkout", username, password);
    const placeOrder = document.querySelector('#placeOrder');
    placeOrder.addEventListener('click', (event) => {
        saveOrder(event, username, password);
    });

    checkout(username);
});