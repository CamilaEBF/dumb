//pyramids!!!
//ok we won't do this with objects. i still know how.

/*
eventually i will move this to another file but for now i just wanna jot down something really quick
game setup
*/
var pDeck = [];
var flipDeck = [];

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

function cardElement(identifier) {
  //the card object
  var playingCard = $("<div></div>");
  var card;
  if (typeof(identifier) == 'number') {
    playingCard.attr('data-idx',identifier);
    card = pDeck[identifier];
  } else {
    playingCard.attr('id','current');
    card = identifier;
  }
  var suit = card['suit'];
  playingCard.attr('data-suit',suit);
  var value = card['value'];
  playingCard.attr('data-value',value);
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
  playingCard.text(value+'o'+suit);
  return playingCard;
}

function shuffle(deck) {
  var l = deck.length;
  for (var i = 0; i < Math.ceil(Math.random()*100)+l; i++) {
    deck.push(deck.splice(Math.floor(Math.random()*l),1)[0]);
  }
  return deck;
}

function createPyramid() {
  // take in args a deck that will be used in creating a pyramid
  var pyramid = [];
  var pyramidDiv = $("<div id='pyramid'></div>"); 
  // line up the rows of the pyramid
  var n = 0;
  for (var row = 0; row < 7; row++) {
    pyramid[row] = [];
    n += row //the index of the 0th position of each row
    for (var pos = 0; pos <= row; pos++) {
      var cardHolder = {};
      var LI; 
      var idx = n+pos;
      cardHolder['card'] = idx;
      var left = (n+(row+1))+pos;
      var right = left + 1
      cardHolder['left'] = (pDeck[left] != undefined) ? left : undefined;
      cardHolder['right'] = (pDeck[right] != undefined) ? right : undefined;
      var hidden = !((cardHolder['left'] == undefined) && (cardHolder['right'] == undefined));
      cardHolder['hidden'] = hidden;
      if (hidden) {
        LI = $("<div></div>");
        LI.text("XoY");
        LI.addClass("hidden");
      } else {
        LI = cardElement(idx);
        LI.addClass("unhidden");
      }
      pyramid[row][pos] = cardHolder;
      pyramidDiv.append(LI);
    }
    pyramidDiv.append($("<br/>"));
  }
  $("#game").append(pyramidDiv);
  /*
  pyramidObj['print'] = function () {
    //will take in an argument that is an array of pyramid rows
    var pyramidList = $("<div id='pyramid'></div>");
    for (var row = 0; row < 7; row++) {
      for (var pos = 0; pos <= row; pos++) {
        var idx = pyramid[row][pos]['card'];
        var LI = $("<div></div>"); //pyramidList.find('li:nth-of-type('+(idx+1)+')');
        var hidden = pyramid[row][pos]['hidden']; //need to put in this property
        //if status is hidden, display XoX instead, and also don't make it clickable
        if (hidden) {
          LI.text("XoY");
          LI.addClass("hidden");
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
          LI.text(value+"o"+suit);
        }
        pyramidList.append(LI);
      }
      pyramidList.append($("<br/>"));
    }
    $("#game").append(pyramidList);
  };
  */
  return pyramid;
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
  var LENGTH_PDECK = 28;
  // randomly select 28 cards from it to form the pDeck
  for (var i = 0; i < LENGTH_PDECK; i++) {
    var idx = Math.floor(Math.random()*myDeck.length);
    pDeck.push(myDeck.splice(idx,1)[0]);
  }
  // shuffle the pDeck
  pDeck = shuffle(pDeck);
  // create the pyramid with the pDeck
  createPyramid();
  // the rest of the cards go in the flipdeck
  // shuffle the flipdeck
  flipDeck = shuffle(myDeck);
  // pop the last card off the flipdeck and set it to currentCard
  var currentCard = flipDeck.pop();
  // connect the pyramid and the currentCard to divs
  var ccard = cardElement(currentCard); 
  $("#game").append($("<br/><label for='current'>Current Card: </label>"));
  $("#game").append(ccard);
  var newCardButton = $("<button></button>");
  newCardButton.click(newCard);
  $("#game").append(newCardButton); 
  playGame();
}

/*
create gameplay:
what happens when user clicks a div element
*/

function playGame() {
  $('.unhidden').each(function() {
    $(this).click(useCard);
  });
}

function newCard() {
  $('#current').remove();
  var x = flipDeck.pop();
  $("#game").append(cardElement(x));
}

function useCard() {
  var currentCard = $('#current');
  var current = currentCard.data('value');
  var value = $(this).data('value');
  var idx = $(this).data('idx');
  if (((value+1)%13 == current) || ((current+1)%13 == value)) {
    console.log("current was",current);
    currentCard.data('value',value);
    currentCard.data('suit',$(this).data('suit'));
    currentCard.text($(this).text());
    //remove the card I just used
    //$(this).remove();
    $(this).html("&nbsp;&nbsp;&nbsp");
    /*
    $(this).removeData('value');
    $(this).removeData('suit');
    $(this).removeData('idx')
    */
    //update status of nth card / remove from pile, allow cards under it to be updated
  } else {
    console.log("invalid move because"+currentCard.text()+", having value"+current+" is not one more or one less than "+$(this).text()+", having value"+value);
  }
}

function updateStatus(card) {
  // removeClass hidden
  // maybe addClass unhidden -- haven't decided whether or not this class is necessary yet
  // data-card-val = cardval
  // data-card-suit = cardsuit
  
  // check if nth element in pyramid is hidden
  // if nth element in pyramid is not hidden then update the li:nth-type-of(n)
  // set the data-value attr to pyramid[n]['value']
  // set the data-suit attr to pyramid[n]['suit']


}
