// grabs header on the forums page and stores it constant variable, so that we may later insert the page title based on what button was clicked to get to this page
const pageHeader = document.querySelector('.page-header');

// creates a new object that we then use to get the URL Parameter made in the forums page antd make that the page header
const urlParameter = new URLSearchParams(window.location.search);
const forumUID = urlParameter.get('f');

// grabs the back button and puts it in a constant
const backBtn = document.querySelector('.forum-topic-view-back-btn');

// grabs the forum from the database
db.collection('forums').doc(forumUID).get()
    .then(doc => {
        pageHeader.innerHTML = doc.data().forumTopic;
        document.querySelector('.forum-topic-actual-text').innerHTML = doc.data().forumDescription;
    })

// adds an event to to back button that will return site to previous page when button clicked
backBtn.addEventListener('click', () => {
    history.back();
})