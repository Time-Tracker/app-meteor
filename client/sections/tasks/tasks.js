Template.startTimer = function() {
  console.log(Session.get('runTimer'));
  if (Session.get('runTimer') !== -1) {
    Session.set('runTimer', Session.get('runTimer') + 1);
    setTimeout(Template.startTimer, 1000)
  }
}

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
    Session.set('runTimer', 0);
    Template.startTimer();

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
    TaskLog.insert({
      'task': this._id,
      'end': (new Date()).getTime(),
      'spent': Session.get('runTimer'),
    })
    Session.set('runTimer', -1);
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