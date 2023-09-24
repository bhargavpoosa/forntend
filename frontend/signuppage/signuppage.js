const signupForm = document.getElementById("signup-form");
const signupButton = document.getElementById("signup-btn");
const onsubmit = async(e) => {
    e.preventDefault();
    const username = signupForm.username.value;
    const password = signupForm.password.value;
    const roles = signupForm.role.value;
    console.log(username);
    console.log(password);
    console.log(roles);
    try{
        let response = await fetch("http://localhost:8080/user/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, roles })
        });
        console.log(response);
        
        if(response.ok){
            alert("You have successfully logged in.");
            location.href = "../loginpage/loginpage.html";
        }
        else {
            loginErrorMsg.style.opacity = 1;
        }
    }
    catch(error){
        console.log(error);
    }
}
signupButton.addEventListener("click",onsubmit);
