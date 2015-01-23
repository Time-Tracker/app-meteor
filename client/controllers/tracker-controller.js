TrackerController = ApplicationController.extend({
  index: function() {
    this.render('trackers');
  },

  new: function() {
    this.render('tracker');
  }
});