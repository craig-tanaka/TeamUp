// gets the accounts-link div in the navigation tag and sotes it in a constant
const accountLinksContainer = document.querySelector('#account-links');

// checks if user is logged in and if the user is logged in change the nav structure to the looged user structure
if (sessionStorage.getItem('loggedIn') === 'Yes') {
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
    </span>`
}

// grabs the logout button and sets the code to logout
document.querySelector('.user-nav-links-container > .logout').addEventListener('click', () => {
    // when logout button is pressed, first set the site wide storage loggen status to no, so that when we travel between pages, each page will know the user is logged out
    sessionStorage.setItem('loggedIn', 'No');
    window.location = './index.html';
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