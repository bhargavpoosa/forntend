const adminForm = document.getElementById("admin-form");
const addButton = document.getElementById("add-btn");
const onsubmit = async(e) => {
    e.preventDefault();
    const productName = adminForm.productName.value;
    const imageUrl = adminForm.imageUrl.value;
    const price = adminForm.price.value;
    const itemCount = adminForm.itemCount.value;
    const description = adminForm.description.value;
    console.log("here");
    
    try{
        let response = await fetch("http://localhost:8080/admin/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productName, imageUrl, price, itemCount, description })
        });
        console.log(response);
        
        if(response.ok){
            alert("Successfully Added");
        }
        else {
            loginErrorMsg.style.opacity = 1;
        }
    }
    catch(error){
        console.log(error);
    }
}
addButton.addEventListener("click",onsubmit);