Template.home.helpers({
  summary: function() {
    var summary = {};
    summary.clients = Client.find({}).count();
    summary.projects = Project.find({}).count();
    summary.tasks = Task.find({}).count();
    summary.completed = TaskLog.find({}).count();
    return summary;
  }
});