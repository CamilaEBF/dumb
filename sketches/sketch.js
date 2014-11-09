Sketch = Backbone.Model.extend({
  defaults: {
    title: 'SKETCH',
    dateCreated: null,
    lastUpdated: null,
    desc: '',
    gist: 'http://gist.github.com/jkwok91',
    tags: []
  },
  initialize: function() {
  },
  updateDate: function() {
    var now = new Date();
    this.set({
      lastUpdated: ""+(now.getMonth()+1)+"/"+now.getDate()+"/"+now.getFullYear() //now!
    });
  }
});
