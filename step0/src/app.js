// insert your new code here
areGirlDevelopersCool = true;

var Person = Backbone.Model.extend({
  urlRoot: "http://spacodemo.herokuapp.com/person",
  defaults: {
    role: "student",
    imgUrl: "http://placekitten.com/200/200",
    firstName: "",
    lastName: ""
  },
  generateUsername: function() {
    this.set("username",this.get("firstName")+this.get("lastName"));
    return this.get("username");
  },
  initialize: function() {
    this.generateUsername();
  }
});

var People = Backbone.Collection.extend({
  model: Person,
  comparator: "lastName",
  initialize: function() {
    this.listenTo(this, 'add', this.sort);
  }
});

var p1 = new Person({firstName: "Jessica", lastName: "Kwok", id: "freerefills"});
p1.save();
var p2 = new Person({firstName: "Misha", lastName: "Bhandari"});
var p3 = new Person({firstName: "Emily", lastName: "Phillips"});
var people = new People([p1,p2,p3]);
var p4 = new Person({firstName: "Greg", lastName: "Shikhman"});
people.add(p4);

var PersonView = Backbone.View.extend({
  className: 'rolodex',
  render: function() {
    var pImage = $('<img/>').attr('src',this.model.get('imgUrl'));
    this.$el.append(pImage);
    return this;
  },
  events: {
    'click': 'onClick'
  },
  onClick: function() {
  }
});

var personView = new PersonView({model:p1});

var RolodexView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  render: function() {
    var template = Handlebars.compile($('#rolodex-template').html());
    var rendered = template({person: this.collection.toJSON()});
    this.$el.append(rendered);
    return this;
  }
});

var rolodexView = new RolodexView({collection: people});

$(document).ready(function(){
  $('body').append(rolodexView.$el);
});
