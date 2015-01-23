Template.projects.events({
  'click .btn-edit-project': function(e) {
    $('#projectName').val(this.name);
    $('#projectName').attr('data-id', this._id);
  },

  'click .btn-cancel': function(e) {
    $('#projectName').val('');
  },

  'click .btn-delete-project': function(e) {
    Project.remove({
      '_id': this._id
    });
  },

  'submit #form-project': function(e) {
    var client = $('#selectClient').val();
    var name = $('#projectName').val();
    var dataId = $('#projectName').attr('data-id');
    console.log(client, name, dataId);

    if (dataId) {
      Project.update({
        '_id': dataId
      }, {
        $set: {
          'name': name,
          'client': client
        }
      });
    } else {
      Project.insert({
        'name': name,
        'client': client
      });
    }
    return false;
  }
});

Template.projects.helpers({
  projects: function() {
    var allprojects = Project.find({});
    console.log(allprojects);
    return allprojects;
  },
  clients: function() {
    return Client.find({});
  }
});

Template.projects.rendered = function() {
  $('#form-project').parsley({
    trigger: 'change'
  });
}