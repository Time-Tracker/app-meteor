function secondsToTime(secs) {
  var hours = Math.floor(secs / (60 * 60));

  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);

  hours = hours ? hours : 0;
  minutes = minutes ? minutes : 0;
  seconds = seconds ? seconds : 0;

  var obj = hours + ':' + minutes + ':' + seconds;
  return obj;
}

Template.tasklogs.helpers({
  tasklogs: function() {
    var tasklogs = TaskLog.find({}).fetch();
    var tasks = Task.find({}).fetch();
    _.each(tasklogs, function(log) {
      var t = _.findWhere(tasks, {
        _id: log.task
      });
      log.taskName = t.name;
    });
    return tasklogs;
  },
  timeSpent: function() {
    return secondsToTime(this.spent);
  },
  startTime: function() {
    var d = new Date(this.end - 1000 * this.spent);
    return d.toDateString() + ', ' + d.toLocaleTimeString();
  },
  endTime: function() {
    var d = new Date(this.end);
    return d.toDateString() + ', ' + d.toLocaleTimeString();
  }
});