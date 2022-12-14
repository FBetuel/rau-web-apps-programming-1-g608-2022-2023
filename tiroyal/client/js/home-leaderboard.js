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
    new User("new-user"),
    new User("player1"),
    new User("megaplayer"),
    new User("superplayer"),
    new User("new-user"),
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
    //// UI Template/component
    // <div class="leaderboard-item">
    //     <div class="leaderboard-user">
    //         <!-- TODO: Change to IMG -->
    //         <div class="leaderboard-profile-pic"></div>
    //         <div>
    //             <div class="leaderboard-rank">#300</div>
    //             <div class="leaderboard-name">Dorel</div>
    //         </div>  
    //     </div>
    //     <div class="leaderboard-score">321312</div>
    // </div>
    const leaderboard = document.getElementById("leaderboard-content");
    for (let i = 0; i<users.length; i++) {
        const item = document.createElement("div");item.className="leaderboard-item";
            const iuser = document.createElement("div");iuser.className="leaderboard-user";
                const pic = document.createElement("div");pic.className="leaderboard-profile-pic";
                const div = document.createElement("div");
                    const rank = document.createElement("div");rank.className="leaderboard-rank";rank.innerText=`#${i+1}`;
                    const name = document.createElement("div");name.className="leaderboard-name";name.innerText=users[i].username;
            const score = document.createElement("div");score.className="leaderboard-score";score.innerText=users[i].points;

        
        iuser.appendChild(pic);
            div.appendChild(rank);
            div.appendChild(name);
        iuser.appendChild(div);
        
        item.appendChild(iuser);
        item.appendChild(score);

        leaderboard.appendChild(item);
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
        users = randomUserPoints(users);
        users = sortUsers(users);
        createLeaderboard(users);
    }
}

function friendsLeaderboard() {
    // Flush panel
    const leaderboard = document.getElementById("leaderboard-content");
    leaderboard.innerHTML = ""

    // Show friend adding section
    const firendsection = document.querySelector('#leaderboard-friends-adder')
    firendsection.classList.remove('removed')

    console.log(section)

    // TODO: Get user's friends from API
    // createLeaderboard(friends)
    // check signin status, prompt for login
    // if no friends: 

}

function globalLeaderboard() {
    const leaderboard = document.getElementById("leaderboard-content");
    leaderboard.innerHTML = ""

    // Hide friend adding section
    const firendsection = document.querySelector('#leaderboard-friends-adder')
    firendsection.classList.add('removed')

    refreshLeaderboard();
}