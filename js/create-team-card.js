// grabs reference to submit button and stores a reference to it in a constant
const submitBtn = document.querySelector('.create-team-card-input.submit');
// gets error label and stores reference to it in a constant
const errorLabel = document.querySelector('.create-team-card-error-label');

// launches an event when a user clicks submit
// the event checks the user inputs for errors before trying to submit the team card to the database
submitBtn.addEventListener('click', () => { 
    if (validateForm()) {
        submitBtn.style.display = 'none';
        errorLabel.innerHTML = 'Creating Team Card......';
        fillVariables();
        createTeamCardDocument();
    } else { 
        alert(errorLabel.innerHTML);
    }
})

// function checks each of the inputs to see they have been filled. If any has not been filled it returns false.
function validateForm(){ 
    let hasNoErrors = true;

    if (document.querySelector('#team-card-game-name-input').value === '')
        hasNoErrors = false;
    if (document.querySelector('#team-card-about-input').value === '')
        hasNoErrors = false;    
    if (document.querySelector('#team-card-description-input').value === '')
        hasNoErrors = false;
    
    if (!hasNoErrors) errorLabel.innerHTML = 'Please Fill in Missing Labels!!!!!';

    // check if user has selected profile picture
    if (document.querySelector('#team-card-profile-picture-input').files.length == 0 && !userHasOnlinePic) {
        hasNoErrors = false;
        errorLabel.innerHTML = 'No Profile Picture Selected';
    }
    
    return hasNoErrors;
}

// creates an event that that launches the image selecter when the profile-picture image is clicked
document.querySelector('.create-team-card-profile-placeholder').addEventListener('click', () => { 
    document.querySelector('#team-card-profile-picture-input').click();
})

// creating variables to hold team card info
let profilePicture, gamePlatform, gameName, teamAbout, teamDescription, gameType, skillLevel;

// function to update team card variables when user click submits before submitting to database function 
function createTeamCardDocument() { 
    // create team card document in database
    db.collection("teamCards").doc(firebase.auth().currentUser.uid).set({
        gameName: gameName,
        teamAbout: teamAbout,
        teamDescription: teamDescription,
        gameType: gameType,
        skillLevel: skillLevel,
        playerName: userDoc.userName,
        playerFirstName: userDoc.userFirstName,
        gamePlatform: gamePlatform
    })
    .then((docRef) => {
        // console.log("Document written");
        if (document.querySelector('#team-card-profile-picture-input').files.length != 0) {
            uploadProfilePicture();
        } else {
            updateUserDocument();
        }
    })
    .catch((error) => {
        console.error("Error adding image: ", error);
    });
}

function fillVariables() { 
    profilePicture = document.querySelector('#team-card-profile-picture-input').files[0];
    gameName = document.querySelector('#team-card-game-name-input').value;
    teamAbout = document.querySelector('#team-card-about-input').value;
    teamDescription = document.querySelector('#team-card-description-input').value;
    gameType = document.querySelector('#team-card-game-type-input').value;
    gamePlatform = document.querySelector('#team-platform-input').value;
    skillLevel = document.querySelector('#team-card-skill-level-input').value;
}

function uploadProfilePicture() { 
    let picUrl = 'teamCardPics/' + firebase.auth().currentUser.uid + '/profile-picture.jpg';

    let picRef = storageReference.child(picUrl);

    picRef.put(profilePicture).then((snapshot) => {
        // console.log('Uploaded a blob or file!');
        updateUserDocument();
    });
}

document.querySelector('#team-card-profile-picture-input').addEventListener('change', () => { 
    document.querySelector('.create-team-card-profile-placeholder').src = URL.createObjectURL(document.querySelector('#team-card-profile-picture-input').files[0]);
})

// a function that updates the users profile database to say he now has a player card
function updateUserDocument() {
    db.collection("users").doc(firebase.auth().currentUser.uid).update({
        "playerHasTeamCard": true
    }).then(() => { 
        // console.log("Document successfully updated!");
        window.location = './team-profile.html?u=' + firebase.auth().currentUser.uid;

    })
}

// Check if user already has a team card, if user does it populates the page inputs with current team card data
firebase.auth().onAuthStateChanged(function(userCredential) {
    if (userCredential) {
        // fill user fields
        db.collection("teamCards").doc(userCredential.uid).get()
            .then(doc => { 
                if (doc.data() == undefined) return;
                document.querySelector('#team-card-game-name-input').value = doc.data().gameName;
                document.querySelector('#team-card-about-input').value = doc.data().teamAbout;
                document.querySelector('#team-card-description-input').value = doc.data().teamDescription;
                document.querySelector('#team-card-skill-level-input').value = doc.data().skillLevel;
                document.querySelector('#team-card-game-type-input').value = doc.data().gameType;
                document.querySelector('#team-platform-input').value = doc.data().gamePlatform;

                document.querySelector('.page-header').innerHTML = 'Update Team Card'; 
                storageReference.child(`/teamCardPics/${userCredential.uid}/profile-picture.jpg`).getDownloadURL()
                .then((url) => {
                    var img = document.querySelector('.create-team-card-profile-placeholder');
                    img.setAttribute('src', url);
                    userHasOnlinePic = true;
                    document.querySelector('.page-header').innerHTML = 'Update Team Card';
                })
            })
    }
});
let userHasOnlinePic;