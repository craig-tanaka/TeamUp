// creates references to the elements in html that are to be populated with the database
const playerName = document.querySelector('.player-name');
const playerGame = document.querySelector('.player-game');
const playerPlatform = document.querySelector('.player-platform');
const cardGameType = document.querySelector('.card-game-type');
const cardGame = document.querySelector('.card-game');
const cardAbout = document.querySelector('.card-about');
const cardDescription= document.querySelector('.card-description');

// Gets requested the player's uid from url
const urlParameter = new URLSearchParams(window.location.search);
const requestedPlayerUid = urlParameter.get('u');

// Gets the player card data from databse using the uid
db.collection("playerCards").doc(requestedPlayerUid).get()
    .then(doc => {
        cardGame.innerHTML = doc.data().gameName;
        playerGame.innerHTML = doc.data().gameName;
        cardGameType.innerHTML = doc.data().gameType;
        playerPlatform.innerHTML = doc.data().gameType;
        cardAbout.innerHTML = doc.data().playerAbout;
        cardDescription.innerHTML = doc.data().playerDescription;
    }).catch(error => { 
})