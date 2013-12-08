//pyramids!!!
//ok we won't do this with objects. i still know how.

var lost = false;
var pDeck = [];
var flipDeck = [];
var pyramid = constructPyramidStructure(); // this is just a structure for the pyramid. this never changes.

/*
this constructs the generic structure for a 7 row pyramid
it will have space for 28 cards
*/
function constructPyramidStructure() {
  var numRows = 7;
  var pStructure = [];
  var counter = 0; // zero-based indexing
  for (var row = 0; row < numRows-1; row++) {
    counter += row;
    for (var pos = 0; pos <= row; pos++) {
      var current = counter + pos;
      pStructure.push([(row+1)+current, (row+1)+current+1]);
    }
  }
  // the last row will always be uncovered
  for (var pos = 0; pos <= numRows; pos++) {
    pStructure.push([undefined,undefined]);
  }
  return pStructure;
}

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

function getText(card) {
  var suit = card['suit'];
  var value = getValue(card['value']);
  return value+'o'+suit;
}

function shuffle(deck) {
  var l = deck.length;
  for (var i = 0; i < Math.ceil(Math.random()*100)+l; i++) {
    deck.push(deck.splice(Math.floor(Math.random()*l),1)[0]);
  }
  return deck;
}

function updateCardDisplay(i) {
  // FOR NEWLY UNHIDDEN CARDS
  var div = $("#pyramid > div:nth-of-type("+(i+1)+")");
  div.removeClass("hidden").addClass("unhidden");
  div.text(getText(pDeck[i]));
  div.click(useCard);
}

function determineStatus(i) {
  return ((typeof(pyramid[i][0]) == 'undefined') && (typeof(pyramid[i][1]) == 'undefined'));
}

function createDisplay() {
  // readies display
  var pyramidDiv = $("<div id='pyramid'></div>"); 
  var counter = 0;
  for (var row = 0; row < 7; row++) {
    counter += row 
    for (var pos = 0; pos <= row; pos++) {
      var current = counter + pos
      var LI = $("<div></div>");
      LI.attr('data-idx',current);
      if (determineStatus(current)) {
        LI.text(getText(pDeck[current])); 
        LI.addClass("unhidden");
        LI.click(useCard);
      } else {
        LI.text("XoY");
        LI.addClass("hidden");
      }
      pyramidDiv.append(LI);
    }
    pyramidDiv.append($("<br/>"));
  }
  $("#game").append(pyramidDiv);
  $("#game").append($("<div id='stack'></div>"));
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
  createDisplay();
  // the rest of the cards go in the flipdeck
  // shuffle the flipdeck
  flipDeck = shuffle(myDeck);
  // pop the last card off the flipdeck and set it to currentCard
  var currentCard = flipDeck.pop();
  console.log(currentCard);
  // connect the pyramid and the currentCard to divs
  var ccard = $("<div id='current'></div>"); 
  ccard.text(getText(currentCard));
  ccard.attr('data-value',currentCard['value']);
  $("#stack").append($("<br/><label for='current'>Current Card: </label>"));
  $("#stack").append(ccard);

  var newCardButton = $("<button>Draw</button>");
  newCardButton.click(newCard);
  $("#stack").append(newCardButton); 

  $("#stack").append($("<br/><div>Remaining: <span id='remaining'></span></div>"));
  $("#remaining").text(flipDeck.length);
}

/*
create gameplay:
what happens when user clicks a div element
*/

function newCard() {
  if (typeof(pDeck[0]) == 'undefined') {
    alert("you've already won... what are you doing");
    return;
  }
  var current = $('#current');
  var x = flipDeck.pop();
  if (typeof(x) == 'undefined') {
    current.text("U LOSE-- NO MO CARDS");
    lost = true;
  } else {
    current.data('value',x['value']);
    current.text(getText(x));
    $("#remaining").text(flipDeck.length);
  }
}

function useCard() {
  if (lost) {
    alert("YO YOU HAVE LOST STOP TRYING");
  } else {
    var currentCard = $('#current');
    var current = currentCard.data('value');
    var idx = $(this).data('idx');
    var value = pDeck[idx]['value'];
    if (((value+1)%13 == current) || ((current+1)%13 == value)) {
      $("#error").text('');
      currentCard.text($(this).text());
      currentCard.data('value',value);
      // update status of nth card 
      updateStatus(idx);
      pDeck[idx] = undefined;
      $(this).html("&nbsp;&nbsp;&nbsp").removeClass("unhidden").unbind('click');
      $(this).removeData('idx');
    } else {
      $("#error").text("invalid move because "+$(this).text()+" is not one more or one less than "+currentCard.text());
    }
  }
}

function updateStatus(cardidx) {
  $(".hidden").each(function() {
    // if the card i just used in useCard is covering another card, remove
    var i = $(this).data('idx');
    var present = pyramid[i].indexOf(cardidx);
    if (present >= 0) {
      // excise it
      pyramid[i][present] = undefined;
    }
    // this changes cards from hidden to unhidden if possible
    if (determineStatus(i)) {
      updateCardDisplay(i);
    }
  });
}
