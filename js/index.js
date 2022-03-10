// grabs the first why-section card stores a reference to it in a javascript constant for later use
const firstWhyCard = document.querySelector('.why-section-card:nth-child(1)');

// grabs all the left buttons on the why-section-cards and stores a reference to it in a javascript constant for later use
const whyCardsLeftBtns = document.querySelectorAll('.why-section-card .left');

// grabs all the right buttons on the why-section-cards and stores a reference to it in a javascript constant for later use
const whyCardsRightBtns = document.querySelectorAll('.why-section-card .right');

// adds a method/event to all the left buttons that is run whenever the button is clicked, the event changes which card is in focus/view by changing the first cards left margin thereby dragging the rest of the buttons with it
whyCardsLeftBtns.forEach(btn => { 
    btn.addEventListener('click', () => {
        // if the middle card is in focus (which is determined by the first having a left margin of -20%) then move the first even more left to show the card on the right, otherwise do nothing as we are already viewing the most right card
        if (firstWhyCard.style.marginLeft === '-20%')
            firstWhyCard.style.marginLeft = '-60%';
        // if first card in view (ie its left margin is 20%) then reset the view by setting it back to -20% 
        else if (firstWhyCard.style.marginLeft === '20%')
            firstWhyCard.style.marginLeft = '-20%';
    })
})
// adds a method/event to all the right buttons that is run whenever the button is clicked, the event changes which card is in focus/view by changing the first cards left margin thereby dragging the rest of the buttons with it
whyCardsRightBtns.forEach(btn => { 
    btn.addEventListener('click', () => {
        // if the middle card is in focus (which is determined by the first having a left margin of -20%) then move the first to the centert to show it
        if (firstWhyCard.style.marginLeft === '-20%')
            firstWhyCard.style.marginLeft = '20%';
        // if the right card card is in view (meaning the first left margin is -60%) then reset left margin to -20% thereby reset the view
        else if (firstWhyCard.style.marginLeft === '-60%')
            firstWhyCard.style.marginLeft = '-20%';
        
    })
})




// Grabs the search input on the page and saves a reference to it in a constant
const searchInput = document.querySelector('#home-search');
// Grabs a the search icon inside the search input on the page and saves a reference to it in a constant
const searchIcon = document.querySelector('.search-icon');


// adds an event whenever user presses enter to submit user search
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchUserInput();
    }
});
// adds an event to when user presses search icon to start search
searchIcon.addEventListener('click', () => { 
    searchUserInput();
})

// function grabs user input and searches it on the players page
function searchUserInput() {
    window.location = './players.html?s=' + searchInput.value;
}