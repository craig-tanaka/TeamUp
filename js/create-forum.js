// grabs submit button and stores in constant
const submitBtn = document.querySelector('#create-forum-submit');
// gets error label and stores reference to it in a constant
const errorLabel = document.querySelector('.create-player-card-error-label');

submitBtn.addEventListener('click', () => { 
    if (validateForm()) {
        submitBtn.style.display = 'none';
        errorLabel.innerHTML = 'Creating Forum......';
        fillVariables();
        sendForumToDB();
    } else { 
        errorLabel.innerHTML = 'Please Fill in Missing Details!!!!!!';
    }
})

// function checks each of the inputs to see they have been filled. If any has not been filled it returns false.
function validateForm() { 
    let hasNoErrors = true;

    if(document.querySelector('#forum-topic-input').value === '')
        hasNoErrors = false;
    if (document.querySelector('#forum-description-input').value === '')
        hasNoErrors = false;

    return hasNoErrors;
}

// variables to store forum data before it is submitted to database
let forumTopic, forumDescription, forumType, forumAuthor;
// fills in variables with data before submitting 
function fillVariables() {
    forumTopic = document.querySelector('#forum-topic-input').value;
    forumDescription = document.querySelector('#forum-description-input').value;
    forumType = document.querySelector('#forum-type-select').value;
    forumAuthor = firebase.auth().currentUser.uid;
}

function sendForumToDB() { 
    db.collection('forums').add({
        forumTopic: forumTopic,
        forumDescription: forumDescription,
        forumType: forumType,
        forumAuthor: forumAuthor
    }).then((doc) => { 
        window.location = './view-forum.html?f=' + doc.id;
    })
}