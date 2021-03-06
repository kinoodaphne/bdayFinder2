var btnLogin = document.querySelector("#submit").addEventListener("click", (e) => {
    let username = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

     fetch('/users/login', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status === "success") {
            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "/";
        } else {
            let feedback = document.querySelector(".feedback");
            feedback.textContent = "Username or password is incorrect.";
            feedback.classList.remove('hidden');
        }
    })

    e.preventDefault();
}); 