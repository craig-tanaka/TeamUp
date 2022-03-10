let messages;

firebase.auth().onAuthStateChanged(function(userCredential) {
    if (userCredential) {
        // User is signed in.
        db.collection('playerMessages').doc(userCredential.uid).collection('messages').get()
            .then(docs => { 
                docs.forEach(doc => {
                    let invitation = document.createElement('div');
                    invitation.className = 'invitation';
                    invitation.innerHTML = `
                        <span class="invitation-default-text">From</span>
                        <span class="invitation-sender">${doc.data().from}</span>
                        <span class="invitation-default-text">:</span>
                        <span class="invitation-message">${doc.data().message}</span>`
                    
                    document.querySelector('.invitations-main-main').appendChild(invitation);
                })
            })
    } else {
        // No user is signed in.
    }
});