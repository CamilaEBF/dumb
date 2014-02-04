var Card = function(value, suit) {
  this.value = value;
  this.suit = suit;
  this.getValue = function() {
    if (this.value == 0) {
      return 'K';
    } else if (this.value == 1) {
      return 'A';
    } else if (this.value == 11) {
      return 'J';
    } else if (this.value == 12) {
      return 'Q';
    } else {
      return this.value.toString();
    }
  };
  this.getText = function() {
    return this.getValue()+'o'+this.suit;
  };
};

var Deck = function() {
  var suits = ['S','H','C','D'];
  var numSuits = suits.length;
  var cardsPerSuit = 13;
  this.cards = [];
  return { 
    'cards': this.cards,
    'createFullDeck': function() {
      for (var i = 0; i < numSuits; i++) {
        for (var j = 0; j < cardsPerSuit; j++) {
          this.cards.push(new Card(j,suits[i]));
        }
      }
    },
    'shuffle': function() {
      var l = this.cards.length;
      for (var i = 0; i < Math.ceil(Math.random()*100)+l; i++) {
        this.cards.push(this.cards.splice(Math.floor(Math.random()*l),1)[0]);
      }
    }
  };
};

