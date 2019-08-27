var btnSignup = document.querySelector("#submit").addEventListener("click", (e) => {
    let username = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let birthday = document.querySelector('#birthday').value;

    fetch('/users/signup', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
            "birthday": birthday
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
        if (json.status === "success") {
            let feedback = document.querySelector(".feedback");
            feedback.textContent = "Sign up complete! You can login now";
            feedback.classList.remove('hidden');

            let token = json.data.token;
            localStorage.setItem("token", token);

            window.location.href = "/";
        } else {
            let feedback = document.querySelector(".feedback");
            feedback.textContent = "Something went wrong";
            feedback.classList.remove('hidden');
        }
    })
});