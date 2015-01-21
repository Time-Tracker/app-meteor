ProjectController = ApplicationController.extend({
  index: function() {
    this.render('projects');
  },

  new: function() {
    this.render('project');
  }
});