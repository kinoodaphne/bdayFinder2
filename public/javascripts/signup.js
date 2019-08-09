var btnSignup = document.querySelector("#submit").addEventListener("click", (e) => {
    let username = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    fetch('http://localhost:3000/users/signup', {
        method: 'post',
        header: {
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
            let feedback = document.querySelector(".feedback");
            feedback.textContent = "Sign up complete";
            feedback.clasList.remove('hidden');

            let token = json.data.token;
            let user_id = json.data.user_id;
            let username = json.data.username;
            
            localStorage.setItem('token', token);
            localStorage.setItem("user_id", user_id);
            localStorage.setItem("username", username);
            window.location.href = "http://localhost:3000";
        }
    }  )
});