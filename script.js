// The following variables below are all the sound variables and mute/unmute fucntions 
let backgroundMusic = new Audio();
backgroundMusic.src = "sounds/bg-music.mp3";
let backgroundMusicStatus = 0;
let backgroundMusicInterval;

function playBackgroundMusic() {
    backgroundMusic.play();
    if (backgroundMusicStatus == 1) {
        backgroundMusic.volume = 0;
    } else {
        backgroundMusic.volume = 0.5;
    }
}

function muteBackgroundMusic() {
    const muteBtnImg = document.getElementById("mute-btn-img");
    if (backgroundMusicStatus == 0) {
        muteBtnImg.setAttribute("src", "assets/header/mute.png");
        backgroundMusic.volume = 0;
        backgroundMusicStatus++;
    } else {
        muteBtnImg.setAttribute("src", "assets/header/unmute.png");
        backgroundMusic.volume = 0.5;
        backgroundMusicStatus--;
    }
}

document.getElementById("mute-header-btn").addEventListener("click", muteBackgroundMusic)
//END HERE

// Card Slot and Swipe Handling
const cardSlot = document.querySelector('.card-slot');
const swipeCard = document.getElementById('swipe-card');
let startX = 0;
let currentX = 0;
let isSwiping = false;
let cardSlotWidth = cardSlot.offsetWidth; 

// Event Listeners for Swipe Actions
swipeCard.addEventListener('mousedown', startSwipe);
swipeCard.addEventListener('touchstart', startSwipe);
swipeCard.addEventListener('mousemove', swipeMove);
window.addEventListener('touchmove', swipeMove);
window.addEventListener('mouseup', endSwipe);
swipeCard.addEventListener('touchend', endSwipe);
window.addEventListener('resize', updateCardSlotWidth);

// Swipe Functions
function updateCardSlotWidth() {
    cardSlotWidth = cardSlot.offsetWidth;
}

function startSwipe(event) {
    isSwiping = true;
    startX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
}

function swipeMove(event) {
    if (!isSwiping) 
        {
            return
        } else if (isSwiping) {
            currentX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
            const deltaX = currentX - startX;
        
            // Check if swipe reached the threshold
            if (Math.abs(deltaX) > (cardSlotWidth/1.8) && isSwiping == true) {
                isSwiping = false;
                swipeCard.style.transitionDuration = `.5s`
                swipeCard.style.transform = `translateX(${cardSlotWidth}px)`;
                swipeCard.style.opacity = `0`
                startCardInterval();
            }
            else if (deltaX > 1)
            {
                swipeCard.style.transitionDuration = `0s`;
                swipeCard.style.transform = `translateX(${deltaX}px)`;
            }
        }


}

function endSwipe() {
    if (isSwiping) {
        isSwiping = false;
        swipeCard.style.transform = 'translateX(0)';
    }
}
//END HERE

// The following lines of codes include all of the functions and variables needed for you to transition from the start screen to the game board
let startScreenTimer

function startCardInterval() {
    startScreenTimer = setInterval(startGame, 500);
    
}

function hideStartScreen() {
    document.getElementById("start-screen").style.display = "none";
    playBackgroundMusic();
    backgroundMusicInterval = setInterval(playBackgroundMusic, 120000);
    clearInterval(startScreenTimer);
}
// END HERE

// The following lines of codes hides all the header and gameboard elements, and shows the end message
function endGame(){
    document.getElementById("game-board").style.display = "none"
    document.getElementById("header").style.display = "none"
    clearInterval(backgroundMusicInterval)
    backgroundMusic.volume = 0
    document.getElementById("end-screen").style.display = "flex"
}
// END HERE

let inputBox = document.getElementById("input-box")
let promptText = document.getElementById("prompt-text")
let promptQuestion = document.getElementById("prompt-question")
let submitBtn = document.getElementById("submit-btn")

let roundIndex = 0

let questionBank = [
    [
        "FTTA",
        "The designated evacuation area for this campus is on Leon Guinto.",
        "TAFT"
    ],
    [
        "VAOELRTE",
        "During an evacuation, do not use the ____ and instead use the nearest emergency stairway.",
        "ELEVATOR"
    ],
    [
        "RLOLNEAA ENUAVE",
        "The designated evacuation area for the AKIC campus is on _________.",
        "ARELLANO AVENUE"
    ],
    [
        "QHAEARKETU",
        "Any sudden shaking of the ground caused by the passage of seismic waves through Earth’s rocks. ",
        "EARTHQUAKE"
    ],
    [
        "UKCD",
        "COVER and HOLD. ",
        "DUCK"
    ],
    [
        "SELTIHW",
        "In the event of a natural disaster, this object will let responders know you need help and lead them to you.",
        "WHISTLE"
    ],
    [
        "UTNRALA",
        "A hazard that is defined as events that have economic, social, and environmental consequences that are unlikely to be prevented. ",
        "NATURAL"
    ],
    [
        "ORCSEHASFTK",
        "After an earthquake, be prepared for _____.",
        "AFTERSHOCKS"
    ],
    [
        "FREI",
        "This could possibly be caused by: negligence, accidents, and faulty electrical wirings and connections. ",
        "FIRE"
    ],
    [
        "MAALR",
        "At the first sign of smoke or fire, you must sound the ____.",
        "ALARM"
    ]
]

function startGame(){
    hideStartScreen()
    promptText.innerHTML = questionBank[roundIndex][0]
    promptQuestion.innerHTML = questionBank[roundIndex][1]
}

function checkAnswer(){
    var inputValue = inputBox.value

    if (inputValue.toUpperCase() == questionBank[roundIndex][2]){
        roundIndex++
        if (roundIndex >= 10) {
            endGame()
        } else {
            promptText.innerHTML = questionBank[roundIndex][0]
            promptQuestion.innerHTML = questionBank[roundIndex][1]
            inputBox.value = ""
        }
    } else {
        alert("PLEASE TRY AGAIN! Your answer is incorrect.")
    }
}

//BUTTONS AND EVENT LISTENERS
submitBtn.addEventListener("click", checkAnswer)

addEventListener('keypress', function (e){
    if (e.key === 'Enter') {
        checkAnswer()
    }
})
