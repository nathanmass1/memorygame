//declaring variables
var card = document.getElementsByClassName("card");
var cards = [...card]
var button = document.getElementsByClassName("submitbutton");
var scorePanel = document.getElementsByClassName("score-panel");
var textAlerts = document.getElementsByClassName("alerts");
var deck = document.getElementById("allCards");
var moves = 0;
var counter = document.querySelector(".moves");
var matchedCard = document.getElementsByClassName("match");
var openedCards = [];

//functions

// count user moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
}
/*
function newText() {
    if (moves >= 2) {
    }
}

document.addEventListener("click", function(){
    var container = document.getElementsByTagName("header");
    container.innerText = "Hello World";
});
*/

// Add alert to H1 text 
var text = document.querySelectorAll('h1');

for(var i=0; i<text.length; i++){
    text[i].addEventListener("click", function(event){
        alert("You just clicked on " + event.target.innerText);
    });
}
/*
var backgroundimage = document.querySelector('image');

backgroundimage.onmouseover = function () {
    backgroundimage.classList.add("special");
}
*/

//need shuffle function
function shuffle(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}


function startGame(){    
    cards = shuffle(cards);

    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset move counter
    moves = 0;
    counter.innerHTML = moves;
    }

// toggles open, show, and disabled class to display cards
var cardClick = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// Add opened cards to openedCards array and check if there's a match
function cardOpen() {
    openedCards.push(this);
    if(openedCards.length === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


// on card match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}


// on card mismatch
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        enable();
        openedCards = [];
    },1100);
}


// disable cards
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


//  enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}



// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", cardClick);
    card.addEventListener("click", cardOpen);
    // card.addEventListener("mouseover", win);
};