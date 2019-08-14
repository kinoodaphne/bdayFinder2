fetch("http://localhost:3000/api/v1/chat", {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    console.log(json);
}).catch(err => {
    console.log("😢😢😢");
    localStorage.removeItem("token");
    window.location.href = "/users/login";
});

// Add a todo on enter
let input = document.querySelector(".message__input");
input.addEventListener("keyup", e=> {
    if (e.keyCode === 13) {
        //on keystroke Enter
        let text = input.value;
        fetch('http://localhost:3000/api/v1/chat', {
            method: "post",
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "text": text
            })
        })
        .then(result => {
            return result.json();
        }).then(json => {
            input.value = "";
            input.focus();

            console.log(json);
            let message = `<div class="message"><div class="message__userAvatar"><img class="message__userAvatarImage" src="images/pig.jpg" alt="username"></div><div class="message__details"><div class="message__user"><strong class="message__userName">Username</strong><span class="message__date">12-05-2019</span></div><div class="message__text"><p>${json.data.message.text}</p></div></div></div>`;
            document.querySelector(".messages").insertAdjacentHTML('afterend', message);
        }).catch(err => {
            console.log(err);
        })
    }

    e.preventDefault();
});

// simple logout functionality
document.querySelector(".option__logout").addEventListener("click", e => {
    localStorage.removeItem("token");
    window.location.href = "/users/login";
    e.preventDefault();
});