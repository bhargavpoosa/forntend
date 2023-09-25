const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-btn");
const onsubmit = async(e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    console.log(username);
    console.log(password);
    try{
        let response = await fetch("http://localhost:8080/user/authenticate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        console.log(response);
        
        if(response.ok){
            const user = await response.json();
            console.log(user);
            alert("You have successfully logged in.");
            
            if(user.roles === "ROLE_USER")
                location.href = `../homepage/home.html?username=${user.username}&password=${user.password}`;
            else
                location.href = `../adminpage/admin.html?username=${user.username}&password=${user.password}`;
        }
        else {
            loginErrorMsg.style.opacity = 1;
        }
    }
    catch(error){
        console.log(error);
    }
}
loginButton.addEventListener("click",onsubmit);
