function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
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

const detailPage = async(event) => {
    event.preventDefault(); 
    const productId = getQueryParam("productId");
    console.log("ProductId", productId);

    try{
        const container = document.getElementById('container');
        let response = await fetch(`http://localhost:8080/product/${productId}`);
        console.log(response);
        if(response.ok){
            const product = await response.json();
            console.log(product);
            const productLayout = document.createElement('div');
            productLayout.classList.add('product-layout');
            productLayout.innerHTML = `
                <div class="product-img">
                    <img
                        src="${product.imageUrl}"
                        alt="${product.productName}"
                    />
                </div>
                <div class="product-info">
                    <h1 class="heading">${product.productName}</h1>
                    <h3 class="price">Rs ${product.price}</h3>
                    <p class="description">
                        ${product.description}
                    </p>
                    <div class="cart">
                        <button class="add-to-cart" onclick="addCart('${product.productId}')">
                            Add to Cart
                        </button>
                        <a href="../cartpage/cartpage.html">Cart</a>
                    </div>
                    <div class="return-policy">
                        <ul>
                            <li>
                                This product is made to order and is
                                typically printed in 3-6 working days. Your
                                entire order will ship out together.
                            </li>
                            <li>
                                Since this product is printed on demand
                                especially for you, it is not eligible for
                                cancellations and returns. Read our Return
                                Policy.
                            </li>
                        </ul>
                    </div>
                </div>
            `
            container.appendChild(productLayout);
        }
    }
    catch(error){
        console.log(error);
    }
}  


document.addEventListener('DOMContentLoaded', detailPage);










