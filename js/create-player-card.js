// grabs reference to submit button and stores a reference to it in a constant
const submitBtn = document.querySelector('.create-player-card-input.submit');
// gets error label and stores reference to it in a constant
const errorLabel = document.querySelector('.create-player-card-error-label');

// launches an event when a user clicks submit
// the event checks the user inputs for errors before trying to submit the player card to the database
submitBtn.addEventListener('click', () => { 
    if (validateForm()) {
        submitBtn.style.display = 'none';
        errorLabel.innerHTML = 'Creating Player Card......';
        fillVariables();
        createplayerCardDocument();
    } else { 
        alert(errorLabel.innerHTML);
    }
})

// function checks each of the inputs to see they have been filled. If any has not been filled it returns false.
function validateForm(){ 
    let hasNoErrors = true;

    if (document.querySelector('#player-card-game-name-input').value === '')
        hasNoErrors = false;
    if (document.querySelector('#player-card-about-input').value === '')
        hasNoErrors = false;    
    if (document.querySelector('#player-card-description-input').value === '')
        hasNoErrors = false;
    
    if (!hasNoErrors) errorLabel.innerHTML = 'Please Fill in Missing Labels!!!!!';

    // check if user has selected profile picture
    if (document.querySelector('#player-card-profile-picture-input').files.length == 0 && !userHasOnlinePic) {
        hasNoErrors = false;
        errorLabel.innerHTML = 'No Profile Picture Selected';
    }
    
    return hasNoErrors;
}

// creates an event that that launches the image selecter when the profile-picture image is clicked
document.querySelector('.create-player-card-profile-placeholder').addEventListener('click', () => { 
    document.querySelector('#player-card-profile-picture-input').click();
})

// creating variables to hold player card info
let profilePicture, playerPlatform, gameName, playerAbout, playerDescription, gameType, skillLevel;

// function to update player card variables when user click submits before submitting to database function 
function createplayerCardDocument() { 
    // create player card document in database
    db.collection("playerCards").doc(firebase.auth().currentUser.uid).set({
        gameName: gameName,
        playerAbout: playerAbout,
        playerDescription: playerDescription,
        gameType: gameType,
        skillLevel: skillLevel,
        playerName: userDoc.userName,
        playerFirstName: userDoc.userFirstName,
        playerPlatform: playerPlatform
    })
    .then((docRef) => {
        // console.log("Document written");
        if (document.querySelector('#player-card-profile-picture-input').files.length != 0) {
            uploadProfilePicture();
        } else { 
            updateUserDocument();
        }
    })
    .catch((error) => {
        console.error("Error adding image: ", error);
    });
}

// fills in variables with data before submitting 
function fillVariables() { 
    profilePicture = document.querySelector('#player-card-profile-picture-input').files[0];
    gameName = document.querySelector('#player-card-game-name-input').value;
    playerAbout = document.querySelector('#player-card-about-input').value;
    playerDescription = document.querySelector('#player-card-description-input').value;
    gameType = document.querySelector('#player-card-game-type-input').value;
    playerPlatform = document.querySelector('#player-platform-input').value;
    skillLevel = document.querySelector('#player-card-skill-level-input').value;
}

function uploadProfilePicture() { 
    let picUrl = 'playerCardPics/' + firebase.auth().currentUser.uid + '/profile-picture.jpg';

    let picRef = storageReference.child(picUrl);

    picRef.put(profilePicture).then((snapshot) => {
        // console.log('Uploaded a blob or file!');
        updateUserDocument();
    });
}

// launches an event to the picture in the form,
// the event opens the file inputs, file exprorer so that the user can select their pic
document.querySelector('#player-card-profile-picture-input').addEventListener('change', () => { 
    document.querySelector('.create-player-card-profile-placeholder').src = URL.createObjectURL(document.querySelector('#player-card-profile-picture-input').files[0]);
})

// a function that updates the users profile database to say he now has a player card
function updateUserDocument() {
    db.collection("users").doc(firebase.auth().currentUser.uid).update({
        "playerHasCard": true
    }).then(() => { 
        // console.log("Document successfully updated!");
        window.location = './player-profile.html?u=' + firebase.auth().currentUser.uid;

    })
}


// Check if user already has a player card, if user does it populates the page inputs with current player card data
firebase.auth().onAuthStateChanged(function(userCredential) {
    if (userCredential) {
        // fill user fields
        db.collection("playerCards").doc(userCredential.uid).get()
            .then(doc => { 
                if (doc.data() == undefined) return;
                document.querySelector('#player-card-game-name-input').value = doc.data().gameName;
                document.querySelector('#player-card-about-input').value = doc.data().playerAbout;
                document.querySelector('#player-card-description-input').value = doc.data().playerDescription;
                document.querySelector('#player-card-skill-level-input').value = doc.data().skillLevel;
                document.querySelector('#player-card-game-type-input').value = doc.data().gameType;
                document.querySelector('#player-platform-input').value = doc.data().playerPlatform;

                document.querySelector('.page-header').innerHTML = 'Update Player Card'; 
                storageReference.child(`/playerCardPics/${userCredential.uid}/profile-picture.jpg`).getDownloadURL()
                .then((url) => {
                    var img = document.querySelector('.create-player-card-profile-placeholder');
                    img.setAttribute('src', url);
                    userHasOnlinePic = true;
                })
            })
    }
});
let userHasOnlinePic;