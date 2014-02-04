var Pyramid = function(rows,deck) {
  this.n = rows;
  this.pDeck = deck;
  this.pStruct = [];
  this.create = function() {
    var numRows = this.n;
    var counter = 0;
    for (var row = 0; row < numRows-1; row++) {
      counter += row;
      for (var pos = 0; pos <= row; pos++) {
        var current = counter+pos;
        this.pStruct.push({
           value: this.pDeck.cards[current] 
          ,children: [(row+1)+current, (row+1)+current+1]
        });
      }
    }
    for (var pos = 0; pos <= numRows; pos++) {
      this.pStruct.push({
         value: this.pDeck.cards[current+pos]
        ,children: [undefined,undefined]
      });
    }
  };
  this.updateStruct = function(i,idx) {
    var isThere = this.pStruct[i].children.indexOf(idx);
    if (isThere >= 0) {
      this.pStruct[i].children[isThere] = undefined;
    }
  };
};
