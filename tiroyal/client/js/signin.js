const URL = "http://localhost:5608/api/v1/authenticate";

const userId = sessionStorage.getItem("userId");
if (userId) {
    window.location.href = "home.html";
}


function signIn() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (email === undefined || password === undefined) {
        alert("Please fill all required information.");
    } else {
        const data = {
            "email": email.value,
            "password": password.value
        }
        makeSignInRequest(data);
    }
}

function makeSignInRequest(data) {
    const params = {
        "method": "POST",
        "mode": "cors",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    };
    fetch(URL, params).then(requestResolved).then(dataReceived).catch(errorAppeared);
}

function requestResolved(response) {
    if (!response.ok) {
        throw Error("Failed to get data.");
    }
    return response.json();
}

function dataReceived(data) {
    sessionStorage.setItem("userId", data.id);
    sessionStorage.setItem("email", data.email);

    document.cookie = `userId=${data.id};userEmail=${data.email};expires=Fri 23 Dec 2022 00:00:00 UTC; path=/;`;

    window.location.href = "home.html"
}

function errorAppeared(error) {
    alert(error.message);
}