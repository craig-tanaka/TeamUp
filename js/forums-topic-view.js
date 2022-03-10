// grabs header on the forums page and stores it constant variable, so that we may later insert the page title based on what button was clicked to get to this page
const pageHeader = document.querySelector('.page-header');

// creates a new object that we then use to get the URL Parameter made in the forums page antd make that the page header
const urlParameter = new URLSearchParams(window.location.search);
const forumsType = urlParameter.get('prev');
pageHeader.innerHTML = forumsType+ ' Gaming';

let forums;

db.collection('forums').where('forumType', '==', forumsType).get()
    .then(docs => { 
        docs.forEach(doc => { 
            let forumElement = document.createElement('div');
            forumElement.className = 'forums-topic-row';
            forumElement.id = doc.id;
            forumElement.innerHTML = `
            <p class="forums-topic-topic">${doc.data().forumTopic}</p>`;
            document.querySelector('.forums-topics--main-main').appendChild(forumElement);
        })
        // adds an event to all topics that will run when the topic is clicked
        document.querySelectorAll('.forums-topic-row').forEach(topic => { 
            topic.addEventListener('click', () => { 
                // changes the page once the topic is clicked to the view-forum page, the url parameter is set to topic title which is inside the second child element of current topic element markup
                window.location = './view-forum.html?f=' + topic.id;
            })
        })
    })








// grabs all the topics on the page and places them in a single constant
const forumTopics = document.querySelectorAll('.forums-topic-row')


