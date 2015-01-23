Template.tasks.events({
  'click .btn-edit-task': function(e) {
    $('#task-name').val(this.name);
    $('#task-name').attr('data-id', this._id);
  },

  'click .btn-cancel': function(e) {
    $('#task-name').val('');
  },

  'click .btn-delete-task': function(e) {
    Task.remove({
      '_id': this._id
    });
  },

  'click .btn-start-task': function(e) {
    var dataId = this._id;
    Task.update({
      '_id': dataId
    }, {
      $set: {
        'working': true
      }
    });

    Template.timer = new Chronos.Timer(5000);
    Tracker.autorun(function() {
      console.log(Template.timer.time.get());
    });
    Template.timer.start();
  },

  'click .btn-stop-task': function(e) {
    var dataId = this._id;
    Task.update({
      '_id': dataId
    }, {
      $set: {
        'working': false
      }
    });

    console.log(Template.timer);
    Template.timer.stop();
  },

  'submit #form-task': function(e) {
    var project = $('#selectProject').val();
    var name = $('#task-name').val();
    var dataId = $('#task-name').attr('data-id');
    console.log(project, name, dataId);

    if (dataId) {
      Task.update({
        '_id': dataId
      }, {
        $set: {
          'name': name,
          'project': project
        }
      });
    } else {
      Task.insert({
        'name': name,
        'project': project,
        'working': false
      });
    }
    return false;
  }
});

Template.tasks.helpers({
  projects: function() {
    return Project.find({});
  },
  tasks: function() {
    return Task.find({});
  }
});

Template.tasks.rendered = function() {
  $('#form-task').parsley({
    trigger: 'change'
  });
}