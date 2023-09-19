async function handleInputChange(inputElement){
    var searchItem = inputElement.value;
    try{
        let response = await fetch(`http://localhost:8080/product/productName/${searchItem}`);
        if(response.ok){
            const data = await response.json();
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            data.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product');
                productItem.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.productName}">
                    <h3>${product.productName}</h3>
                    <p>Rs ${product.price}</p>
                    <button class="add-to-cart" onclick="addCart('${product.productId}')">Add to Cart</button>
                `;
                productList.appendChild(productItem);
            })
        }
    }
    catch(error){
        console.log(error);
    }
}
const addCart = async (productId) => {
    try{
        let response = await fetch(`http://localhost:8080/cart/add/${productId}`,{method: 'POST', headers: {
            'Content-Type': 'application/json', 
        }})
        if(response.ok){
            console.log("Successfull");
        }
    }
    catch(error){
        console.error(error);
    }
}
const home = async (event) => {
    event.preventDefault(); 
    try {
        let response = await fetch("http://localhost:8080/product/");
        if (response.ok) {
            const data = await response.json(); 
            console.log("Response: ", data);
            const productList = document.getElementById('product-list');
            data.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product');
                productItem.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.productName}">
                    <h3>${product.productName}</h3>
                    <p>Rs ${product.price}</p>
                    <button class="add-to-cart" onclick="addCart('${product.productId}')">Add to Cart</button>
                `;
                productList.appendChild(productItem);
            });
        } else {
            console.error("Failed to fetch data");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

document.addEventListener('DOMContentLoaded', home)