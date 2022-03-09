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
    if (document.querySelector('#team-card-profile-picture-input').files.length == 0) {
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
let profilePicture, gameName, teamAbout, teamDescription, gameType, skillLevel;

// function to update team card variables when user click submits before submitting to database function 
function createTeamCardDocument() { 
    // create team card document in database
    db.collection("teamCards").doc(firebase.auth().currentUser.uid).set({
        gameName: gameName,
        teamAbout: teamAbout,
        teamDescription: teamDescription,
        gameType: gameType,
        skillLevel: skillLevel
    })
    .then((docRef) => {
        // console.log("Document written");
        uploadProfilePicture();
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
    skillLevel = document.querySelector('#team-card-skill-level-input').value;
}

function uploadProfilePicture() { 
    let picUrl = 'teamCardPics/' + firebase.auth().currentUser.uid + '/profile-picture.jpg';

    let picRef = storageReference.child(picUrl);

    picRef.put(profilePicture).then((snapshot) => {
        // console.log('Uploaded a blob or file!');
        window.location = './team-profile.html?user=' + firebase.auth().currentUser.uid;
    });
}

document.querySelector('#team-card-profile-picture-input').addEventListener('change', () => { 
    document.querySelector('.create-team-card-profile-placeholder').src = URL.createObjectURL(document.querySelector('#team-card-profile-picture-input').files[0]);
})