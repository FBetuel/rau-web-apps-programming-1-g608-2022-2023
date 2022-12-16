const API_URL = "http://127.0.0.1:5000"
class User {
    name;
    password;
    score;
    email;
    firstName;
    lastName;

    constructor(name) {
        this.name = name;
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
    for (let i = 0; i<users.length; i++) {
        users[i].score = parseInt(Math.random() * 100);
        users[i].rank = i+1;
    }
    return users;
}
randomUserPoints(USERS);
sessionStorage.setItem("users", JSON.stringify(USERS));

function sortCondition(user1, user2) {
    if (user1.score > user2.score) {
        return -1;
    }
    if (user1.score < user2.score) {
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
                    const rank = document.createElement("div");rank.className="leaderboard-rank";rank.innerText=`#${users[i].rank}`;
                    const name = document.createElement("div");name.className="leaderboard-name";name.innerText=users[i].name;
            const score = document.createElement("div");score.className="leaderboard-score";score.innerText=users[i].score;

        
        iuser.appendChild(pic);
            div.appendChild(rank);
            div.appendChild(name);
        iuser.appendChild(div);
        
        item.appendChild(iuser);
        item.appendChild(score);

        leaderboard.appendChild(item);
    }
}

function friendsLeaderboard() {
    // Flush panel
    const leaderboard = document.getElementById("leaderboard-content");
    leaderboard.innerHTML = ""

    // Show friend adding section
    const firendsection = document.querySelector('#leaderboard-friends-adder')
    firendsection.classList.remove('removed')

    // TODO: Get user's friends from API
    // createLeaderboard(friends)
    // check signin status, prompt for login
    // if no friends: 

}

// TODO: Caching
// TODO: Automatic
function globalLeaderboard(time='all', page=0) {
    // Save previous state all/week/day so we know it when we click away from firends panel
    document.getElementById('global-btn').previous=time
    document.getElementById('global-btn').ipage = page

    // Flush panel
    if(page == 0) {
        const leaderboard = document.getElementById("leaderboard-content");
        leaderboard.innerHTML = ""
    }

    // Hide friend adding section
    const firendsection = document.querySelector('#leaderboard-friends-adder')
    firendsection.classList.add('removed')

    // GET /api/v1/global?timeframe=week&pagenum=0 HTTP/1.1" 200
    fetch(`${API_URL}/api/v1/global?`+ new URLSearchParams({
        timeframe: time,
        pagenum: page,
    }))
    .then((response) => response.json())
    .then((data_leaderboard) => {
        // Remove offline banner
        document.querySelector('#fake-data-banner').classList.add('removed')
        console.log(data_leaderboard)
        createLeaderboard(data_leaderboard)

        // Do infinite scrolling, if response is not empty (end of leaderboard)
        if (data_leaderboard.length)
            lastItemObserver.observe(document.querySelector(".leaderboard-item:last-child"))
    })
    .catch((error) => {
        // USE THE OFFLINE FAKE DATA IF SERVER IS OFFLINE
        let users = sessionStorage.getItem("users");
        // Show offline banner
        document.querySelector('#fake-data-banner').classList.remove('removed')
        if (users) {
            users = JSON.parse(users);
            users = randomUserPoints(users);
            users = sortUsers(users);
            createLeaderboard(users);
        }
    });
}
globalLeaderboard();

// https://www.youtube.com/watch?v=2IbRtjez6ag
const lastItemObserver = new IntersectionObserver(entries => {
    const lastItem = entries[0]
    if(!lastItem.isIntersecting) return
    
    const prevTime = document.getElementById('global-btn').previous
    const page = document.getElementById('global-btn').ipage + 1
    globalLeaderboard(prevTime, page)
    
    lastItemObserver.unobserve(lastItem.target)

    // !Last item gets reobserved in the global leaderboard after request
    // Perhaps globalleaderboard should've returned an OK value or null and be checked in here instead?

}, {
    rootMargin: "100px"
})
