// Firebase (database & user authentication) app, api configuration details
const firebaseConfig = {
    apiKey: "AIzaSyBrFyTyoLEkb1utep1c39-r6cxb55jy3Zc",
    authDomain: "teamup-2022.firebaseapp.com",
    projectId: "teamup-2022",
    storageBucket: "teamup-2022.appspot.com",
    messagingSenderId: "945379313472",
    appId: "1:945379313472:web:f9e08ba84acdf95b515ca5"
};

// Initialize Firebase app and database
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();



firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        showLoggedUserInterface();
    } else {
        // No user is signed in.
    }
});

// gets the accounts-link div in the navigation tag and stores a reference to it in a constant
const accountLinksContainer = document.querySelector('#account-links');

// Removes the register and login buttons in the navigation since the user is logged in and shows user links
function showLoggedUserInterface() { 
    accountLinksContainer.innerHTML =
        `<span class="player-nav-container-link">
            <img src="./img/invitations.png" id="nav-invitations-img" alt="invitations">
            <li class="nav-link welcome">Welcome Hossam</li>
            <div class="user-nav-links-container">
                <a href="./create-player-card.html">Create Player Card</a>
                <a href="./create-team-card.html">Create Team Card</a>
                <a href="./create-your-forum.html">Create Forum</a>
                <a href="" class="logout">Logout</a>
            </div>
        </span>`;
    
    // grabs the logout button and sets the code to logout
    document.querySelector('.user-nav-links-container > .logout').addEventListener('click', () => {
        // when logout button is pressed, first set the site wide storage loggen status to no, so that when we travel between pages, each page will know the user is logged out

        // sessionStorage.setItem('loggedIn', 'No');
        // window.location = './index.html';
    });

    // grabs invitations img and an event that changes page to invitations page whenever the image is clicked
    document.querySelector('#nav-invitations-img').addEventListener('click', () => { 
        window.location = './invitations.html'
    })

    // grabs user name in nav and event that shows the user-nav-links-container when clicked
    document.querySelector('.nav-link.welcome').addEventListener('click', () => {
        if(document.querySelector('.user-nav-links-container').style.display ==='block')
            document.querySelector('.user-nav-links-container').style.display = 'none';
        else
            document.querySelector('.user-nav-links-container').style.display = 'block';
    });
}