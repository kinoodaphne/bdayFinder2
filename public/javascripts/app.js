// PRIMUS LIVE
const base_url = "https://bday-finder-2.herokuapp.com",
    local_url = "http://localhost:3000";

primus = Primus.connect(base_url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
            ,
        min: 500 // Number: The minimum delay before we try reconnect.
            ,
        retries: 10 // Number: How many times we should try to reconnect.
    }
});

primus.on('data', (json) => {
    if (json.action === "addMessage") {
        appendMessage(json.data);
    }
});

fetch("/api/v1/chat", {
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

// Append message
let appendMessage = (json) => {
    let message = `<div class="message"><div class="message__userAvatar"><img class="message__userAvatarImage" src="images/pig.jpg" alt="username"></div><div class="message__details"><div class="message__user"><strong class="message__userName">${json.data.message.username}</strong></div><div class="message__text"><p>${json.data.message.text}</p></div></div></div>`;
    document.querySelector(".messages").insertAdjacentHTML('afterend', message);
}

// Add a message on enter
let input = document.querySelector(".message__input");
input.addEventListener("keyup", e => {
    if (e.keyCode === 13) {
        //on keystroke Enter
        let text = input.value;
        fetch('/api/v1/chat', {
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

                primus.write({
                    "action": "addMessage",
                    "data": json
                });

                // appendMessage(json);

            }).catch(err => {
                console.log(err);
            })
    }

    e.preventDefault();
});

let btnSubmit = document.querySelector('#submit');
btnSubmit.addEventListener("click", e => {
    console.log("button clicked");
    
    let text = input.value;
    fetch('/api/v1/chat', {
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

            primus.write({
                "action": "addMessage",
                "data": json
            });

            // appendMessage(json);

        }).catch(err => {
            console.log(err);
        })
    e.preventDefault();
});

// simple logout functionality
document.querySelector(".option__logout").addEventListener("click", e => {
    localStorage.removeItem("token");
    window.location.href = "/users/login";
    e.preventDefault();
});