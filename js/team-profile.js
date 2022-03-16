// creates references to the elements in html that are to be populated with the database
const playerName = document.querySelector('.player-name');
const teamGame = document.querySelector('.team-game');
const gamePlatform = document.querySelector('.team-platform');
const cardGameType = document.querySelector('.card-game-type');
const cardGame = document.querySelector('.card-game');
const cardAbout = document.querySelector('.card-about');
const cardDescription= document.querySelector('.card-description');

// Gets requested the player's uid from url
const urlParameter = new URLSearchParams(window.location.search);
const requestedPlayerUid = urlParameter.get('u');

// Shows leave a message button if the profile to be shown is the user's
firebase.auth().onAuthStateChanged(() => {
    if (firebase.auth().currentUser.uid !== requestedPlayerUid) {
        document.querySelector('#leave-a-message-btn').style.display = 'block';
    }
});

// Gets the team card data from databse using the uid
db.collection("users").doc(requestedPlayerUid).get()
    .then(doc => { 
        playerName.innerHTML = doc.data().userName;
    }).catch(error => { 
    })
db.collection("teamCards").doc(requestedPlayerUid).get()
    .then(doc => {
        cardGame.innerHTML = doc.data().gameName;
        teamGame.innerHTML = doc.data().gameName;
        cardGameType.innerHTML = doc.data().gameType;
        gamePlatform.innerHTML = doc.data().gamePlatform;
        cardAbout.innerHTML = doc.data().teamAbout;
        cardDescription.innerHTML = doc.data().teamDescription;
    }).catch(error => { 
    })

storageReference.child(`/teamCardPics/${requestedPlayerUid}/profile-picture.jpg`).getDownloadURL()
        .then((url) => {
            var img = document.querySelector('.team-profile-picture');
            img.setAttribute('src', url);
        })

// creates a window where the user can a leave a message for the profile they are viewing
document.querySelector('#leave-a-message-btn').addEventListener('click', () => { 
    let messageWindow = document.createElement('div');
    messageWindow.className = 'message-window-container';

    messageWindow.innerHTML = `
        <div class='message-window-overlay'></div>
        <div class='message-window'>
            <label for="message-text" class="message-text-label">Leave a Message for ${playerName.innerHTML}</label>
            <textarea name="message-text" id="message-text-input" cols="30" rows="2"></textarea>
            <input type="submit" value="Submit" class="message-text-submit">
        </div>`;
    document.querySelector('body').appendChild(messageWindow);

    document.querySelector('.message-text-submit').addEventListener('click', () => { 
        document.querySelector('.message-text-label').innerHTML = 'Sending Message...';
        document.querySelector('.message-text-submit').style.display = 'none';
        // create player card document in database
        db.collection(`playerMessages`).doc(requestedPlayerUid).collection('messages').doc(firebase.auth().currentUser.uid).set({
            from: userDoc.userName,
            senderID: firebase.auth().currentUser.uid,
            message: document.querySelector('#message-text-input').value
        })
        .then((docRef) => {
            // console.log("Document written");
            document.querySelector('.message-text-label').innerHTML = 'Sent';
            setTimeout(() => document.querySelector('body').removeChild(messageWindow), 750);

        })
        .catch((error) => {
            console.error("Error adding image: ", error);
        });
    })

    
    document.querySelector('.message-window-overlay').addEventListener('click', () => { 
        messageWindow.removeChild(document.querySelector('.message-window'));
        messageWindow.removeChild(document.querySelector('.message-window-overlay'));
    })
})

// disable leave a message button if user is viewing their own profile