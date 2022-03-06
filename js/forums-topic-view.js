// grabs header on the forums page and stores it constant variable, so that we may later insert the page title based on what button was clicked to get to this page
const pageHeader = document.querySelector('.page-header');

// creates a new object that we then use to get the URL Parameter made in the forums page antd make that the page header
const urlParameter = new URLSearchParams(window.location.search);
const pageHeaderText = urlParameter.get('prev');
pageHeader.innerHTML = pageHeaderText + ' Gaming';

// grabs all the topics on the page and places them in a single constant
const forumTopics = document.querySelectorAll('.forums-topic-row')

// adds an event to all topics that will run when the topic is clicked
forumTopics.forEach(topic => { 
    topic.addEventListener('click', () => { 
        window.location = './view-forum.html'
    })
})