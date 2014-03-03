window.AppView = Backbone.View.extend({
  el: $("body"),
  initialize: function () {
  // create a collection
    this.friends = new Friends( null, { view: this });
  },
  events: {
    "click #add-friend": "showPrompt",
  },
  showPrompt: function () {
    var friend_name = prompt("who is ur friend?");
    // create a model
    var friend_model = new Friend({ name: friend_name });
    // add it to the collection
    this.friends.add(friend_model);
  },
  addFriendLi: function (model) {
    $("#friends-list").append("<li>"+model.get('name')+"</li>");
  }
});
