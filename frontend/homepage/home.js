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
const addCart = async (productId, username, password) => {
    try{
        console.log("From Cart", username, password);

        const basicAuth = btoa(`${username}:${password}`);
        console.log(`Basic ${basicAuth}`);
        let response = await fetch(`http://localhost:8080/cart/add/${username}/${productId}`,{method: 'POST', headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${basicAuth}`,
            'Accept': 'application/json' 
        }
    });
        if(response.ok){
            console.log("Successfull");
        }
    }
    catch(error){
        console.error(error);
    }
}

function redirect(productId){
    const productPageUrl = `../productDetail/productDetail.html?productId=${productId}`;
    window.location.href = productPageUrl;
}

const home = async (event) => {
    event.preventDefault(); 
    const url = new URL(window.location.href);
    const username = url.searchParams.get("username");
    const password = url.searchParams.get("password");
    console.log("From Home", username, password);

    var cartLink = document.getElementById("cartLink");
    var cartUrl = `../cartpage/cartpage.html?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    cartLink.href = cartUrl;


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
                    <a href="../productDetail/productDetail.html?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&productId=${product.productId}" onclick="redirect('${product.productId}')">
                        <img src="${product.imageUrl}" alt="${product.productName}">
                    </a>
                    <h3>${product.productName}</h3>
                    <p>Rs ${product.price}</p>
                    <button class="add-cart" onclick="addCart('${product.productId}', '${username}', '${password}')">Add to Cart</button>
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