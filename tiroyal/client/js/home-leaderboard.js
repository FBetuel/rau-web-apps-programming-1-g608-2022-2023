class User {
    username;
    password;
    points;
    email;
    firstName;
    lastName;

    constructor(username) {
        this.username = username;
    }
}



// TODO: Get this using an API (future)
const USERS = [
    new User("player1"),
    new User("megaplayer"),
    new User("superplayer"),
    new User("new-user")
]
function randomUserPoints(users) {
    for (const user of users) {
        user.points = parseInt(Math.random() * 100);
    }
    return users;
}
randomUserPoints(USERS);
sessionStorage.setItem("users", JSON.stringify(USERS));

function sortCondition(user1, user2) {
    if (user1.points > user2.points) {
        return -1;
    }
    if (user1.points < user2.points) {
        return 1;
    }
    return 0;
}

function sortUsers(users) {
    const sortedUsers = users.sort(sortCondition);
    return sortedUsers;
}

function createLeaderboard(users) { 
    users = randomUserPoints(users);
    users = sortUsers(users);

    const leaderboard = document.getElementById("leaderboard");
    for (const user of users) {
        const leader = document.createElement("p");
        leader.innerText = `${user.username} --- ${user.points}`;
        leaderboard.appendChild(leader);
    }
}

// TODO: Automatic
function refreshLeaderboard() {
    const leaderboard = document.getElementById("leaderboard-content");
    if (leaderboard.children.length > 1) {
        let currentLeaderIndex = 1;
        while (leaderboard.children.length > 1) {
            leaderboard.children[currentLeaderIndex].remove();
        }
    }

    let users = sessionStorage.getItem("users");
    if (users) {
        users = JSON.parse(users);
        createLeaderboard(users);
    }
}