// grabs the two buttons on the forums page and stores them in constant variable, as the buttons wont change.
const physicalGamingBtn = document.querySelector('.forums-topic-options.physical');
const digitalGamingBtn = document.querySelector('.forums-topic-options.digital');

// creates an event that runs whenever the 'physical gaming' button button is clicked
physicalGamingBtn.addEventListener('click', () => { 
    // changes the page once the button is clicked to the forums-topic-view page, the code after the ? mark is additional info that tells the forums-view-page the button that was pressed to get to it and change information page according
    window.location = './forums-topic-view.html?prev=physical'
});


// creates a similar event when the digital button is clicked
digitalGamingBtn.addEventListener('click', () => { 
    // changes the page once the button is clicked to the forums-topic-view page
    window.location = './forums-topic-view.html?prev=digital'
});