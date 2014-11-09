var Hero = function() {
  // if this were backbone i'd extend a model
  // anyway it extends CCSprite, so it has an image and a physicsBody and a bunch of other shit
  this.name;
  this.el;
  this.constructor = function(name) {
    // for the purposes of testing this shit in JS, i'm adding in a property
    this.name = name;
  };
};

Hero.prototype.physicsBody = function() {
  this.position.x = 0;
  this.position.y = 0;
  this.applyImpulse = function() {
    var jumpin = setInterval(function() {
      // change the position;
      this.position.x++;
      this.position.y++;
      this.el.style.position.x = this.position.x;
      this.el.style.position.y = this.position.y;
      console.log("juuuuump");
    }, 100);
  }
};

Hero.prototype.setPhysicsBody = function() {
  console.log("i am a physics bod");
};
