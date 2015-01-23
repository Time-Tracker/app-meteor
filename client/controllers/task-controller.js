TaskController = ApplicationController.extend({
  index: function() {
    this.render('tasks');
  },

  new: function() {
    this.render('task');
  }
});