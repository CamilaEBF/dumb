//pyramids!!!
//ok we won't do this with objects. i still know how.

/*
helper functions to be used in initializing the game
*/

function createDeck() {
  var suits = ['S','H','C','D'];
  var cards = [];
  for (var i = 0; i < suits.length; i++) {
    for (var j = 0; j < 13; j++) {
      cards.push({'suit':suits[i],'value':j});
    }
  }
  return cards;
}

function createPyramid(pDeck) {
  // deck that will be used in creating a pyramid
  // line up the rows of the pyramid
  var pyramid = [];
  var n = 0;
  for (var row = 0; row < 7; row++) {
    pyramid[row] = [];
    n += row //the index of the 0th position of each row
    for (var pos = 0; pos < row; pos++) {
      cardHolder = {};
      cardHolder['card'] = n+c;
      cardHolder['left'] = (n+row+1)+c;
      cardHolder['right'] = (n+row+1)+c+1;
      console.log(cardHolder);
      pyramid[row][pos] = cardHolder;
    }
  }
}

/*
initialize game 
- by creating a deck
- by creating a pyramid from that deck
- and printing pyramid to the browser window
*/
function createPyramidsGame() {
  // create a deck
  // randomly select 28 cards from it to form the pDeck
  // shuffle the pDeck
  // create the pyramid with the pDeck
  // the rest of the cards go in the flipdeck
  // shuffle the flipdeck
  // pop the top card off the flipdeck and set it to currentCard
  // connect the pyramid and the currentCard to divs
}

/*
create gameplay:
what happens when user clicks a div element
*/
