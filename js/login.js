// grabs all the login button on the page and places it in a constant
const loginBtn = document.querySelector('#login-submit-input');
// gets error label and stores reference to it in a constant
const errorLabel = document.querySelector('.login-error-label');

// adds an event that is run when login btn is pressed
loginBtn.addEventListener('click', (e) => {

    if (validateForm()) {
        document.querySelector('.details-row.submit').style.display = 'none';
        errorLabel.innerHTML = 'Loging in......';

        firebase.auth().signInWithEmailAndPassword(document.querySelector('#login-email-input').value,
                                                document.querySelector('#login-password-input').value)
        .then((userCredential) => {
            window.location = './index.html';
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            document.querySelector('.details-row.submit').style.display = 'flex';
            alert(errorMessage);
            errorLabel.innerHTML = errorMessage;
        });
    } else {
        alert(errorLabel.innerHTML);
    }
})

// Checks if user has filled in inputs
function validateForm() { 
    let hasNoErrors = true;

    
    if (document.querySelector('#login-password-input').value === '')
        hasNoErrors = false;
    if (document.querySelector('#login-email-input').value === '') { 
        hasNoErrors = false;
        if (!hasNoErrors) errorLabel.innerHTML = 'Please Fill in Missing Labels!!!!!';
    }
    else if (!document.querySelector('#login-email-input').value.includes('@') || !document.querySelector('#login-email-input').value.includes('.')) { 
        hasNoErrors = false;
        errorLabel.innerHTML = 'Email is not in Correct Format';
    }
    
    return hasNoErrors;
}