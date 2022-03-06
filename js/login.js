// grabs all the login button on the page and places it in a constant
const loginBtn = document.querySelector('#login-submit-input');

//since the app doesnt have an online database , the folowing creates a reference to browsers sessionStorage for storage that shared bewteen pages
myStorage = window.sessionStorage;

// adds an event that is run when login btn is pressed
loginBtn.addEventListener('click', (e) => {
    // event first emulates a login by creating a variable in localstorage
    myStorage.setItem('loggedIn', 'Yes');
    window.location = './index.html';
})