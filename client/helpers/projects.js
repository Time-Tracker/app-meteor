Project = new Mongo.Collection("project");

Template.projects.events({
  'click .btn-edit-project': function(e) {
    console.log(this);
    Router.go('project/' + this._id + '/edit');
  },
  'click .btn-delete-project': function(e) {
    console.log(e);
  }
});

Template.projects.helpers({
  projects: function() {
    return Project.find({});
  }
});