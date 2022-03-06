// grabs all the player-cards on the page and puts them in a single constant
const playerCards = document.querySelectorAll('.player-card');

// adds an event to all player-cards that opens the player-profile page when a player card is clicked
playerCards.forEach(topic => {
    topic.addEventListener('click',()=> {
        window.location = './player-profile.html';
    })
});