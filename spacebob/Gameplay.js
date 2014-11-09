var Gameplay = function() {
  var _timeElapsed;
  this._character;
  this._physicsNode;
  this._$levelNode; // levelWrapper
  var _currentLevel; // look i made a private var!

  this.constructor = function() {
    console.log("constructing");
    _timeElapsed = 0;
    _character = new Hero("jessica");
    _character.el = $("#hero");
    _physicsNode.el = $(".gameplay-physicsNode");
    _$levelNode = $(".gameplay-levelNode");
    _currentLevel = 1;
    this.startTimer();
  };

  this.startTimer = function() {
    var tick = setInterval(function() {
      _timeElapsed++;
      console.log(_timeElapsed);
    }, 100);
  };

  this.getTimeElapsed = function() {
    return _timeElapsed;
  };

  this.getLevel = function() {
    var level = CCBReader.loadAsScene(_currentLevel);
    // put level into levelWrapper
    this._$levelNode = level;
  };

  this.didLoadAllStuff = function() {
    this.getLevel;
    // i want the current level’s physics node to append the character
    currentLevel.physicsNode.append(this._character);
    // specify that the physicsNode has a collision delegate
    this._physicsNode.collisionDelegate = this;
  };

  this.onEnter = function() {
    // set up the part when character enters the level ??
    // physics should line up and whatever, i guess
    // also camera should follow character
  };

  this.onClick = function() {
    // handle click events
    // make the character jump
    if (this._character.isJumping) {
      this._character.isJumping = true;
      this._character.physicsBody.applyImpulse();
    }
  };
}

