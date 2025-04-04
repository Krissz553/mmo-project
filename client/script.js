const apiURL = 'https://mmo-server.onrender.com';

// Check if user is logged in
document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
        showUserUI(loggedInUser);
    }
});

function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(`${apiURL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("message").innerText = data.message;
    })
    .catch(err => console.error(err));
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(`${apiURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem("username", username);
            showUserUI(username);
        } else {
            document.getElementById("message").innerText = "Invalid credentials.";
        }
    })
    .catch(err => console.error(err));
}

function logout() {
    localStorage.removeItem("username");
    document.body.classList.remove("show-user");
}

function showUserUI(username) {
    document.getElementById("display-username").innerText = username;
    document.body.classList.add("show-user");
}
