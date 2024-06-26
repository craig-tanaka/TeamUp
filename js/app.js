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
const storageReference = firebase.storage().ref();


// gets the accounts-link div in the navigation tag and stores a reference to it in a constant
const accountLinksContainer = document.querySelector('#account-links');

firebase.auth().onAuthStateChanged(function (userCredential) {
    if (userCredential) {
        // User is signed in.
        showLoggedUserInterface();
        getUserProfile();
    } else {
        // No user is signed in.
        accountLinksContainer.style.display = 'flex';
    }
});

// Removes the register and login buttons in the navigation since the user is logged in and shows user links
function showLoggedUserInterface() { 
    accountLinksContainer.innerHTML =
        `<span class="player-nav-container-link">
            <img src="./img/invitations.png" id="nav-invitations-img" alt="invitations">
            <li class="nav-link welcome">Welcome</li>
            <div class="user-nav-links-container">
                <a class="player-card-nav-link" href="./create-player-card.html">Create Player Card</a>
                <a class="team-card-nav-link" href="./create-team-card.html">Create Team Card</a>
                <a class="create-forum-nav-link" href="./create-your-forum.html">Create Forum</a>
                <a href="" class="logout-nav-link">Logout</a>
            </div>
        </span>`;
    
    // grabs the logout button and sets the code to logout
    document.querySelector('.user-nav-links-container > .logout-nav-link').addEventListener('click', () => {
        // signs out user then reloads page
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            window.location = './index.html';
        }).catch((error) => {
            // An error happened.
        });
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

// Function checks if user has player card and team cards
// if user has these cards, function places their links in navigation
function getUserProfile() { 
    db.collection("users").doc(firebase.auth().currentUser.uid).get().then(doc => {
        userDoc = doc.data();
        document.querySelector('.nav-link.welcome').innerHTML = `Welcome ${doc.data().userFirstName}`;
        if (userDoc.playerHasCard) {
            document.querySelector('.user-nav-links-container > .player-card-nav-link').innerHTML = 'Your Card';
            // document.querySelector('.user-nav-links-container > .player-card-nav-link').href = './player-profile.html?u=' + firebase.auth().currentUser.uid;

        }
        if (userDoc.playerHasTeamCard) {
            document.querySelector('.user-nav-links-container > .team-card-nav-link').innerHTML = 'Team Card';
        }
        accountLinksContainer.style.display = 'flex';
     })
}

let userDoc;