// Variable to hold player cards from database
let cards;
// Variable holding all cards filtered by sidebar options
let cardsFiltered;
// Variable to hold search value
let searchValue = '';
// variable used to check if this is first view update
let isFirstViewUpdate = true;

// grabs the selection-options and puts them in the respective constant
const physicalSelectionOption = document.querySelector('.selection-option.physical');
const digitalSelectionOption = document.querySelector('.selection-option.digital');
const pcSelectionOption = document.querySelector('.selection-option.pc');
const playstationSelectionOption = document.querySelector('.selection-option.playstation');

// adds an event that is run whenever the selection-option is clicked
physicalSelectionOption.addEventListener('click', () => {
    // first check if the other option was the one previously active if so hide the checkmark on that other option and remove the active class on that option and then put the check mark nad active class on this current option
    if (digitalSelectionOption.classList.contains('active')) {
        digitalSelectionOption.children[0].style.opacity = 0;
        digitalSelectionOption.classList.remove('active');

        physicalSelectionOption.children[0].style.opacity = 1;
        physicalSelectionOption.classList.add('active');

        // filter cards by physical
        filterCards();
    }
})
// adds an event that is run whenever the selection-option is clicked
digitalSelectionOption.addEventListener('click', () => {
    // first check if the other option was the one previously active if so hide the checkmark on that other option and remove the active class on that option and then put the check mark nad active class on this current option
    if (physicalSelectionOption.classList.contains('active')) {
        physicalSelectionOption.children[0].style.opacity = 0;
        physicalSelectionOption.classList.remove('active');

        digitalSelectionOption.children[0].style.opacity = 1;
        digitalSelectionOption.classList.add('active');

        // filter cards by physical
        filterCards();
    }
})
// adds an event that is run whenever the selection-option is clicked
pcSelectionOption.addEventListener('click', () => {
    // first check if the other option was the one previously active if so hide the checkmark on that other option and remove the active class on that option and then put the check mark nad active class on this current option
    if (playstationSelectionOption.classList.contains('active')) {
        playstationSelectionOption.children[0].style.opacity = 0;
        playstationSelectionOption.classList.remove('active');

        pcSelectionOption.children[0].style.opacity = 1;
        pcSelectionOption.classList.add('active');
        filterCards();
    }
})
// adds an event that is run whenever the selection-option is clicked
playstationSelectionOption.addEventListener('click', () => {
    // first check if the other option was the one previously active if so hide the checkmark on that other option and remove the active class on that option and then put the check mark nad active class on this current option
    if (pcSelectionOption.classList.contains('active')) {
        pcSelectionOption.children[0].style.opacity = 0;
        pcSelectionOption.classList.remove('active');

        playstationSelectionOption.children[0].style.opacity = 1;
        playstationSelectionOption.classList.add('active');
        filterCards();
    }
})


// launches an event when a user searches
document.querySelector(".search-input").addEventListener('keyup', function (e) {
    searchValue = document.querySelector(".search-input").value;
    filterCards();
});

// Fetches player Cards from database and stores them in cards variable
db.collection("playerCards").get()
    .then((querySnapshot) => {
        document.querySelector('.main-section').innerHTML = '';
        document.querySelector(".search-input").disabled = false;
        cards = querySnapshot;

        addCardsToDom();
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

// function filters card list based on user selected on options in page sidebar
function filterCards() {
    cardsFiltered = cards;

    // filtering by game search----------------------------------------------------------
    if (searchValue !== '') {
        cardsFiltered = cards.docs.filter(card => {
            return card.data().playerName.toLowerCase().includes(searchValue.toLowerCase())
                || card.data().playerFirstName.toLowerCase().includes(searchValue.toLowerCase())
                || card.data().gameName.toLowerCase().includes(searchValue.toLowerCase());
        })
    }
    // filtering by game search----------------------------------------------------------


    // filtering by game type----------------------------------------------------------
    let gameType;
    if (physicalSelectionOption.classList.contains('active')) {
        gameType = 'Physical';
    } else if (digitalSelectionOption.classList.contains('active')) {
        gameType = 'Digital';
    }

    if (cardsFiltered.docs) {
        cardsFiltered = cardsFiltered.docs.filter(card => {
            return card.data().gameType === gameType;
        })
    } else {
        cardsFiltered = cardsFiltered.filter(card => {
            return card.data().gameType === gameType;
        })
    }
    // filtering by game type----------------------------------------------------------


    // filtering by platform----------------------------------------------------------
    let gamePlatform;
    if (pcSelectionOption.classList.contains('active')) {
        gamePlatform= 'PC';
    } else if (playstationSelectionOption.classList.contains('active')) {
        gamePlatform = 'Playstation';
    }

    if (cardsFiltered.docs) {
        cardsFiltered = cardsFiltered.docs.filter(card => {
            return card.data().playerPlatform === gamePlatform;
        })
    } else {
        cardsFiltered = cardsFiltered.filter(card => {
            return card.data().playerPlatform === gamePlatform;
        })
    }
    // filtering by platform----------------------------------------------------------

    // Update the page now showing filtered results
    updateCardView(cardsFiltered);
}

// Updates the cards shown on page given a list of cards
function addCardsToDom() {
    document.querySelector('.main-section').innerHTML = '';
    cards.forEach(card => {
        cardData = card.data();

        let playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.id = card.id;

        playerCard.innerHTML = `
                        <img src="./img/player-car-header.jpg" class="player-card-img">
                        <h4>${cardData.playerName}</h4>
                        <p>${cardData.playerFirstName}</p>
                        <p>${cardData.gameName}</p>
                        <p>${cardData.skillLevel}</p>`

        document.querySelector('.main-section').appendChild(playerCard);
        picDatabaseUrl = 'playerCardPics/' + card.id+ '/profile-picture.jpg'
        storageReference.child(picDatabaseUrl).getDownloadURL()
            .then((url) => {
                var img = document.getElementById(card.id).children[0];
                img.setAttribute('src', url);
            }).catch(error => { 
                // console.log('Player image not found');
            });
    });

    if (document.querySelector('.main-section').innerHTML === '') {
        let infoLabel = document.createElement('div');
        infoLabel.className = 'main-section-error-info-label';
        infoLabel.innerHTML = 'No Player Card Found'

        document.querySelector('.main-section').appendChild(infoLabel);
    }

    addCardEventListeners();
    filterCards();
}
// Updates the cards shown on page given a list of cards
function updateCardView(cardList) {
    playerCards = document.querySelectorAll('.player-card');
    playerCards.forEach(card => { 
        card.style.display = 'none';
    })

    cardList.forEach(card => {
        document.getElementById(card.id).style.display = 'flex';
    });

    if (cardList.size == 0) {
        let infoLabel = document.createElement('div');
        infoLabel.className = 'main-section-error-info-label';
        infoLabel.innerHTML = 'No Player Found'

        document.querySelector('.main-section').appendChild(infoLabel);
    } else {
        if (document.querySelector('.main-section-error-info-label')) {
            document.querySelector('.main-section')
                .removeChild(document.querySelector('.main-section-error-info-label'));
        }
    }

    addCardEventListeners();
}
// adds an event to all player-cards that opens the player-profile page when a player card is clicked
function addCardEventListeners() {
    // grabs all the player-cards on the page and puts them in a single constant
    const playerCards = document.querySelectorAll('.player-card');
    playerCards.forEach(card => {
        card.addEventListener('click', () => {
            window.location = './player-profile.html?u=' + card.id;
        })
    });
}