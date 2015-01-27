function secondsToTime(secs) {
  var hours = Math.floor(secs / (60 * 60));

  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);

  // var obj = {
  //   "h": hours,
  //   "m": minutes,
  //   "s": seconds
  // };
  var obj = hours + ':' + minutes + ':' + seconds;
  return obj;
}


Template.startTimer = function() {
  if (Session.get('runTimer') !== undefined) {
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
    Session.set('currentTask', this);
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
    console.log(Session.get('runTimer'));
    TaskLog.insert({
      'task': this._id,
      'end': (new Date()).getTime(),
      'spent': Session.get('runTimer'),
    })
    Session.set('runTimer');
    Session.set('currentTask');
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
  },
  currentTask: function() {
    var task = Session.get('currentTask');
    if (task) {
      task.spent = secondsToTime(Session.get('runTimer'));
    }
    return task;
  }
});

Template.tasks.rendered = function() {
  $('#form-task').parsley({
    trigger: 'change'
  });
}