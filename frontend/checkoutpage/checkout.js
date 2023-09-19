const placeOrder = document.querySelector('#placeOrder');
const saveOrder = async (event) => {
    try{
        event.preventDefault(); 
        console.log('hi');
        const cartProducts = await fetch("http://localhost:8080/cart/");
        let productList = "";
        let finalAmount = 0;
        if(cartProducts.ok){
            const cartItems = await cartProducts.json();
            cartItems.forEach(cart => {
                productList+=cart.prod_id + ",";
                finalAmount+=cart.price * cart.quantity;
            })
        }
        console.log(finalAmount);
        console.log(productList);
        const response = await fetch(`http://localhost:8080/cart/order/${finalAmount}/${productList}`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
        if(response.ok){
            console.log("Successfull");
        }
    }
    catch(error){
        console.log(error);
    }
}
const checkout = async () => {
    try{
        let totalAmount = 0;
        const total = document.getElementById('total');
        const response = await fetch("http://localhost:8080/cart/");
        if(response.ok){
            const data = await response.json();
            console.log(data);
            data.forEach(cart => {
                totalAmount+=cart.price * cart.quantity;
            });
        
            const amountHeader = document.createElement('h3');
            amountHeader.classList.add('total-value');
            amountHeader.innerHTML = `
                    <h3 class="total-value">Rs ${totalAmount}</h3>
                `;
            total.appendChild(amountHeader);
        }

    }
    catch(error){
        console.log(error);
    }
}
document.addEventListener('DOMContentLoaded', checkout);
document.addEventListener('click', saveOrder);