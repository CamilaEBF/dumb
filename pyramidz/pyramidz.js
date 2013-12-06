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

function shuffle(deck) {
  var l = deck.length;
  for (var i = 0; i < Math.ceil(Math.random()*100)+l; i++) {
    deck.push(deck.splice(Math.floor(Math.random()*l),1)[0]);
  }
  return(deck);
}

function createPyramid(pDeck) {
  // take in args a deck that will be used in creating a pyramid
  var pyramid = [];
  // line up the rows of the pyramid
  var n = 0;
  for (var row = 0; row < 7; row++) {
    pyramid[row] = [];
    n += row //the index of the 0th position of each row
    for (var pos = 0; pos <= row; pos++) {
      cardHolder = {};
      cardHolder['card'] = n+pos;
      var left = (n+(row+1))+pos;
      var right = left + 1
      cardHolder['left'] = (pDeck[left] != undefined) ? left : undefined;
      cardHolder['right'] = (pDeck[right] != undefined) ? right : undefined;
      cardHolder['hidden'] = !((cardHolder['left'] == undefined) && (cardHolder['right'] == undefined));
      pyramid[row][pos] = cardHolder;
    }
  }
  var pyramidObj = {};
  pyramidObj['pyra'] = pyramid;
  pyramidObj['print'] = function () {
    //will take in an argument that is an array of pyramid rows
    var pyrtext = '';
    for (var row = 0; row < 7; row++) {
      pyrtext += Array(7-row).join("&nbsp;&nbsp;&nbsp;");
      for (var pos = 0; pos <= row; pos++) {
        var idx = pyramid[row][pos]['card'];
        var suit;
        var value;
        var hidden = pyramid[row][pos]['hidden']; //need to put in this property
        //if status is hidden, display XoX instead, and also don't make it clickable
        if (hidden) {
          pyrtext += "XoY&nbsp;&nbsp;&nbsp;";
        } else {
          var card = pDeck[idx];
          var suit = card['suit'];
          var value = card['value'];
          if (value == 0) {
            value = 'K';
          } else if (value == 1) {
            value = 'A';
          } else if (value == 11) {
            value = 'J';
          } else if (value == 12) {
            value = 'Q';
          } else {
            value = value.toString();
          }
          pyrtext += "<a href='#'>"+value+'o'+suit+"</a>&nbsp;&nbsp;&nbsp;";
        }
      }
      pyrtext += "<br/>";
    }
    return pyrtext; 
  };
  return pyramidObj;
}


/*
initialize game 
- by creating a deck
- by creating a pyramid from that deck
- and printing pyramid to the browser window
*/
function createPyramidsGame() {
  // create a deck
  var myDeck = createDeck();
  var pDeck = [];
  var LENGTH_PDECK = 28;
  // randomly select 28 cards from it to form the pDeck
  for (var i = 0; i < LENGTH_PDECK; i++) {
    var idx = Math.floor(Math.random()*myDeck.length);
    pDeck.push(myDeck.splice(idx,1)[0]);
  }
  // shuffle the pDeck
  pDeck = shuffle(pDeck);
  // create the pyramid with the pDeck
  var pyramidObj = createPyramid(pDeck);
  $('#game').html(pyramidObj.print());
  // the rest of the cards go in the flipdeck
  // shuffle the flipdeck
  var flipDeck = shuffle(myDeck);
  // pop the top card off the flipdeck and set it to currentCard
  var currentCard = flipDeck[0];
  // connect the pyramid and the currentCard to divs
}

createPyramidsGame();

/*
create gameplay:
what happens when user clicks a div element
*/
