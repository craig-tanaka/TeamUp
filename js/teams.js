// grabs the selection-options and puts them in the respective constant
const physicalSelectionOption = document.querySelector('.selection-option.physical');
const digitalSelectionOption = document.querySelector('.selection-option.digital');
const pcSelectionOption = document.querySelector('.selection-option.pc');
const playstationSelectionOption = document.querySelector('.selection-option.playstation');

// adds an event that is run whenever the selection-option is clicked
physicalSelectionOption.addEventListener('click', () => { 
    // first check if the other option was the one previously active if so hide the checkmark on that other option and remove the active class on that option and then put the check mark nad active class on this current option
    if (digitalSelectionOption.classList.contains('active')) { 
        digitalSelectionOption.children[0].style.opacity = 0;
        digitalSelectionOption.classList.remove('active');

        physicalSelectionOption.children[0].style.opacity = 1;
        physicalSelectionOption.classList.add('active');
    }
})
// adds an event that is run whenever the selection-option is clicked
digitalSelectionOption.addEventListener('click', () => { 
    // first check if the other option was the one previously active if so hide the checkmark on that other option and remove the active class on that option and then put the check mark nad active class on this current option
    if (physicalSelectionOption.classList.contains('active')) { 
        physicalSelectionOption.children[0].style.opacity = 0;
        physicalSelectionOption.classList.remove('active');

        digitalSelectionOption.children[0].style.opacity = 1;
        digitalSelectionOption.classList.add('active');
    }
})
// adds an event that is run whenever the selection-option is clicked
pcSelectionOption.addEventListener('click', () => { 
    // first check if the other option was the one previously active if so hide the checkmark on that other option and remove the active class on that option and then put the check mark nad active class on this current option
    if (playstationSelectionOption.classList.contains('active')) { 
        playstationSelectionOption.children[0].style.opacity = 0;
        playstationSelectionOption.classList.remove('active');

        pcSelectionOption.children[0].style.opacity = 1;
        pcSelectionOption.classList.add('active');
    }
})
// adds an event that is run whenever the selection-option is clicked
playstationSelectionOption.addEventListener('click', () => { 
    // first check if the other option was the one previously active if so hide the checkmark on that other option and remove the active class on that option and then put the check mark nad active class on this current option
    if (pcSelectionOption.classList.contains('active')) { 
        pcSelectionOption.children[0].style.opacity = 0;
        pcSelectionOption.classList.remove('active');

        playstationSelectionOption.children[0].style.opacity = 1;
        playstationSelectionOption.classList.add('active');
    }
})