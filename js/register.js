// gets submit btn and stores reference to it in a constant
const submitBtn = document.querySelector('#register-submit-input');
// gets error label and stores reference to it in a constant
const errorLabel = document.querySelector('.register-error-label');

// variable to user data when user logins
let user;

// creates an event that is called when button is clicked
submitBtn.addEventListener('click', () => {
    // Call the validateForm method to check if the user has filled in the form properly before registering the user
    if (validateForm()) {
        submitBtn.style.display = 'none';
        errorLabel.innerHTML = 'Creating Account......';
        fillVariables();
        createUser();
    } else {
        alert(errorLabel.innerHTML)
    }
})

// function checks each of the inputs to see they have been filled. If any has not been filled it returns false. Also checks if the password and confirmPassword inputs have the same value
function validateForm() { 
    let hasNoErrors = true;

    if (document.querySelector('#register-username-input').value === '')
        hasNoErrors = false;
    if (document.querySelector('#register-email-input').value === '')
        hasNoErrors = false;    
    if (document.querySelector('#register-firstname-input').value === '')
        hasNoErrors = false;
    if (document.querySelector('#register-lastname-input').value === '')
        hasNoErrors = false;
    if (document.querySelector('#register-birthdate-input').value === '')
        hasNoErrors = false;
    if (document.querySelector('#register-password-input').value === '')
        hasNoErrors = false;
    if (document.querySelector('#register-confirm-password-input').value === '')
        hasNoErrors = false;
    
    if (!hasNoErrors) errorLabel.innerHTML = 'Please Fill in Missing Labels!!!!!';

    // checks if email contains @ or . to see if it is in the correct format
    if (!document.querySelector('#register-email-input').value.includes('@') || !document.querySelector('#register-email-input').value.includes('.')) { 
        hasNoErrors = false;
        errorLabel.innerHTML = 'Email is not in Correct Format';
    }
    
    // checks if passwords match
    if (document.querySelector('#register-confirm-password-input').value !== document.querySelector('#register-password-input').value) {
        hasNoErrors = false;
        errorLabel.innerHTML = 'Passwords Do Not Match!!!!!';
    }

    return hasNoErrors;
}

let username, email, firstName, lastName, birthDate;
// function fills the above variables with data the user has entered in the inputs after they have been validated
function fillVariables() { 
    username = document.querySelector('#register-username-input').value;
    email = document.querySelector('#register-email-input').value;
    firstName = document.querySelector('#register-firstname-input').value;
    lastName = document.querySelector('#register-lastname-input').value;
    birthDate = document.querySelector('#register-birthdate-input').value;
}

// This function sends the user email and password to firebase authentication so that their account can be created
function createUser() { 
    firebase.auth().createUserWithEmailAndPassword(email, document.querySelector('#register-password-input').value)
    .then((userCredential) => {
        // Signed in 
        user = userCredential.user;
        createUserDocument();
        console.log(user);
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        errorLabel.innerHTML = errorMessage;
    });
}

// creates a document in the database that stores user info such as username and birthdate
function createUserDocument() { 
    db.collection("users").doc(user.uid).set({
        userName: username,
        userEmail: email,
        userFirstName: firstName,
        userLastName: lastName,
        userBirthDate: birthDate,
        playerHasCard: false,
        playerHasTeamCard: false

    })
    .then((docRef) => {
        // console.log("Document written with ID: ", docRef.id);
        window.location = './index.html';
    })
    .catch((error) => {
        // console.error("Error adding document: ", error);
    });
}