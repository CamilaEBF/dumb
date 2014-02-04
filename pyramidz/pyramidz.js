//i am ready to use objects
//letz do it

var PyramidGame = function(level) {
  //level is number of rows in the pyramid
  var lvl = level;
  //private properties
  var $pyramid = $('div#pyramid');
  var $error = $('p#error');
  var $rem = $('span#rem');
  var $current = $('span#current');
  var $draw = $('button#draw');
  var $start = $('button#start');
  //unchangable, aside from "constructPyStruct"
  var pyramid;
  //instance variables
  var lost, won;
  var myDeck;
  var pDeck;

  /*METHODS*/
  this.startGame = function() {
    startGame();
  };
  var startGame = function() {
    // initializing
    $pyramid.text("");
    lost = false;
    won = false;
    myDeck = new Deck();
    pDeck = new Deck();
    $draw.unbind('click');
    $start.unbind('click');
    
    // create a deck for the pyramid
    myDeck.createFullDeck();
    myDeck.shuffle();
    // randomly select 28 cards from it to form the pDeck
    for (var i = 0; i < 28; i++) {
      var idx = Math.floor(Math.random()*myDeck.length);
      pDeck.cards.push(myDeck.cards.splice(idx,1)[0]);
    }
    // shuffle the pDeck
    pDeck.shuffle();
    // create pyramid
    pyramid = new Pyramid(lvl, pDeck);
    pyramid.create();
    // now create the visuals
    constructDisplay();
    // start off the game by flipping the first card
    newCard();
  }
  //to construct the blank pyramid structure
  var constructDisplay = function() {
    var counter = 0;
    for (var row = 0; row < lvl; row++) {
      counter += row
      for (var pos = 0; pos <= row; pos++) {
        var current = counter + pos
        var $pItem = $("<div>");
        $pItem.attr('data-idx',current);
        if (determineHidden(current)) {
          $pItem.text(pyramid.pStruct[current].value.getText());
          $pItem.addClass("unhidden");
          $pItem.click(useCard);
        } else {
          $pItem.text("___");
          $pItem.addClass("hidden");
        }
        $pyramid.append($pItem);
      }
      $pyramid.append($("<br/>"));
    }
    // bind event handlers
    $draw.click(newCard);
    $start.click(startGame);
  };
  var newCard = function() {
    if (won) {
      $error.text("you have already won.  why are you trying to draw more cards");
    } else if (lost) {
      $error.text("you have already lost.  why are you trying to draw more cards");
    } else {
      var x = myDeck.cards.pop();
      var rem = myDeck.cards.length;
      $rem.text(rem);
      if (typeof(x) == 'undefined') {
        $current.text("U LOSE-- NO MO CARDS");
        alert("YOU LOSE-- NO MO CARDS");
        lost = true;
      } else {
        $current.data('value',x['value']);
        $current.text(x.getText());
      }
    }
  }

  var useCard = function(e) {
    if (lost) {
      alert("YO YOU HAVE LOST STOP TRYING");
    } else {
      console.log(won);
      // get index from clicked item
      var idx = $(e.target).data('idx');
      // is valid play?
      var played = compareValue(idx);
      if (played) {
        $(this).html("&nbsp;&nbsp;&nbsp").removeClass("unhidden").unbind('click');
        $(this).removeData('idx');
        if (idx == 0) {
          alert('YOU WON');
          won = true;
          $current.text('');
          $start.text('HOT STREAK-- Play again!');
          return;
        }
      } else {
        $error.text("invalid move because "+$(e.target).text()+" is not one more  or one less than "+$('#current').text());
      }
    }
  };

  var compareValue = function(idx) {
      var current = $current.data('value');
      console.log(current,idx);
      var playedCard = pyramid.pStruct[idx].value;
      var value = playedCard['value'];
      if (((value+1)%13 == current) || ((current+1)%13 == value)) {
        $error.text('');
        $current.text(playedCard.getText());
        $current.data('value',value);
        // update status of nth card
        updateStatus(idx);
        pyramid.pStruct[idx].value = undefined;
        return true;
      } else {
        return false;
      }
  };
  var determineHidden = function(i) {
    return ((typeof(pyramid.pStruct[i]['children'][0]) == 'undefined') && (typeof(pyramid.pStruct[i]['children'][1]) == 'undefined'));
  };

  // update status of all other cards
  var updateStatus = function(idx) {
    $(".hidden").each(function() {
      // if the card i just used in useCard is covering another card, remove
      var i = $(this).data('idx');
      console.log("index of div is",i);
      pyramid.updateStruct(i,idx);
      if (determineHidden(i)) {
        updateCardDisplay(i);
      }
    });
    console.log(pyramid.pStruct);
  };

  var updateCardDisplay = function(idx) {
    var $div = $("#pyramid > div:nth-of-type("+(idx+1)+")");
    $div.removeClass("hidden").addClass("unhidden");
    console.log(idx,":",pyramid.pStruct[idx].value);
    $div.text(pyramid.pStruct[idx].value.getText());
    $div.click(useCard);
  };

}
