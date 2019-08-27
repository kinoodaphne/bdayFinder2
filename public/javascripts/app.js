// PRIMUS LIVE
const base_url = "https://bday-finder-2.herokuapp.com",
    local_url = "http://localhost:3000";

primus = Primus.connect(`http://localhost:3000?bday=${localStorage.getItem("birthday")}`, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
            ,
        min: 500 // Number: The minimum delay before we try reconnect.
            ,
        retries: 10 // Number: How many times we should try to reconnect.
    }
});

/**
 * if message added = success => append message to chat
 */
primus.on('data', (json) => {
    if (json.action === "addMessage") {
        appendMessage(json.data);
    }
});

/**
 * Check if user is logged in; if not => /users/login
 */
if (!localStorage.getItem('token')) {
    window.location.href = "/users/login";
}

/** Fetch all messages */
fetch(base_url + "/api/v1/chat", {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();

}).then(json => {
    json.data.chat.forEach(message => {
        let newMessage = `<div class="message"><div class="message__userAvatar"><img class="message__userAvatarImage" src="images/pig.jpg" alt="username"></div><div class="message__details"><div class="message__user"><strong class="message__userName">${message.username}</strong></div><div class="message__text"><p>${message.text}</p></div></div></div>`;
        document.querySelector(".messages").insertAdjacentHTML('afterend', newMessage);
    });

}).catch(err => {
    console.log(err);
    console.log("Unable to load data");
});

// Append message to chat
let appendMessage = (json) => {
    let message = `<div class="message"><div class="message__userAvatar"><img class="message__userAvatarImage" src="images/pig.jpg" alt="username"></div><div class="message__details"><div class="message__user"><strong class="message__userName">${json.data.message.username}</strong></div><div class="message__text"><p>${json.data.message.text}</p></div></div></div>`;
    document.querySelector(".messages").insertAdjacentHTML('afterend', message);
}

// Add a message on enter key
let input = document.querySelector(".message__input");
input.addEventListener("keyup", e => {
    if (e.keyCode === 13) {
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

                /**
                 * This will add a double message to the users screen whoever posted it
                 * 
                 * appendMessage(json);
                 */

            }).catch(err => {
                console.log(err);
            })
    }

    e.preventDefault();
});

// Add a message on click button submit
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

            /**
             * This will add a double message to the users screen whoever posted it
             * 
             * appendMessage(json);
             */

        }).catch(err => {
            console.log(err);
        })
    e.preventDefault();
});

// When clicked on button logout
document.querySelector(".option__logout").addEventListener("click", e => {
    localStorage.removeItem("token");
    localStorage.removeItem("birthday");
    window.location.href = "/users/login";
    e.preventDefault();
});