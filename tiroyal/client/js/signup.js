const URL = "http://localhost:5608/api/v1/register";


function createAccount() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const secondPassword = document.getElementById("secondPassword");

    const data = {
        "name": name.value,
        "email": email.value,
        "password": password.value,
        "second_password": secondPassword.value
    };

    const params = {
        "method": "POST",
        "mode": "cors",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    }

    fetch(URL, params).then(requestResolved).then(dataReceived).catch(errorAppeared);
}

function requestResolved(response) {
    if (!response.ok) {
        throw Error("Failed to register user.");
    }
    return response.json();
}

function dataReceived(data) {
    window.location.href = "signin.html"
}

function errorAppeared(error) {
    alert(error.message);
}