//pyramids!!!
//ok we won't do this with objects. i still know how.

var pDeck = [];
var flipDeck = [];
var pyramid = [];

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

function getValue(value) {
  if (value == 0) {
    return 'K';
  } else if (value == 1) {
    return 'A';
  } else if (value == 11) {
    return 'J';
  } else if (value == 12) {
    return 'Q';
  } else {
    return value.toString();
  }
}

function cardElement(identifier) {
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
  var value = card['value'];
  playingCard.attr('data-value',value);
  playingCard.text(getValue(value)+'o'+suit);
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
  var pyramidDiv = $("<div id='pyramid'></div>"); 
  // line up the rows of the pyramid
  var n = 0;
  for (var row = 0; row < 7; row++) {
    n += row //the index of the 0th position of each row
    for (var pos = 0; pos <= row; pos++) {
      var cardHolder = {};
      var LI; 
      var left = (n+pos)+(row+1);
      var right = left + 1
      cardHolder['left'] = (pDeck[left] != undefined) ? left : undefined;
      cardHolder['right'] = (pDeck[right] != undefined) ? right : undefined;
      if (!((cardHolder['left'] == undefined) && (cardHolder['right'] == undefined))) {
        LI = $("<div></div>");
        LI.text("XoY");
        LI.addClass("hidden");
      } else {
        LI = cardElement(n+pos);
        LI.addClass("unhidden");
      }
      pyramid.push(cardHolder);
      pyramidDiv.append(LI);
    }
    pyramidDiv.append($("<br/>"));
  }
  $("#game").append(pyramidDiv);
  $("#game").append($("<div id='stack'></div>"));
  return pyramid;
}


/*
initialize game 
- by creating a deck
- by creating a pyramid from that deck
- and printing pyramid to the browser window
*/
function createPyramidsGame() {
  $("#game").append($("<div id='error'></div><br/>"));
  // create a deck
  var myDeck = createDeck();
  // randomly select 28 cards from it to form the pDeck
  for (var i = 0; i < 28; i++) {
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
  $("#stack").append($("<br/><label for='current'>Current Card: </label>"));
  $("#stack").append(ccard);
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
  if (typeof(x) == 'undefined') {
    console.log("YOU HAVE LOST");
    $("#stack").append($("<div>U LOSE-- NO MO CARDS</div>"));
  } else {
    $("#stack").append(cardElement(x));
  }
}

function useCard() {
  var currentCard = $('#current');
  var current = currentCard.data('value');
  var value = $(this).data('value');
  var idx = $(this).data('idx');
  if (((value+1)%13 == current) || ((current+1)%13 == value)) {
    $("#error").text('');
    currentCard.data('value',value);
    currentCard.text($(this).text());
    //remove the card I just used
    //$(this).remove();
    $(this).html("&nbsp;&nbsp;&nbsp");
    /*
    $(this).removeData('value');
    $(this).removeData('idx')
    */
    //update status of nth card / remove from pile, allow cards under it to be updated
    updateStatus(idx);
  } else {
    $("#error").text("invalid move because "+$(this).text()+" is not one more or one less than "+currentCard.text());
  }
}

function updateStatus(cardidx) {
  var checkThese = $('.hidden');
  for (var i = 0; i < checkThese.length; i++) {
    console.log("checking pyramid[",i);
    pyramid[i]['left'] = (pyramid[i]['left'] == cardidx) ? undefined : pyramid[i]['left'];
    pyramid[i]['right'] = (pyramid[i]['right'] == cardidx) ? undefined : pyramid[i]['right'];
    if ((typeof(pyramid[i]['left']) == 'undefined') && (typeof(pyramid[i]['right']) == 'undefined')) {
      var cardDiv = $('#pyramid > div:nth-of-type('+(i+1)+')');
      console.log(cardDiv);
      cardDiv.removeClass('hidden').addClass('unhidden');
      var card = pDeck[i];
      var value = card['value'];
      var suit = card['suit'];
      cardDiv.attr('data-value',value);
      cardDiv.attr('data-idx',i);
      cardDiv.text(getValue(value)+'o'+suit);
      cardDiv.click(useCard);
    } else {
      //do nothing
    }
  }
}
