function displayError(error) {
  var message = '';
  if (error.details) {
    message = error.details;
  } else {
    message = error.reason;
  }
  $('.alert-danger').html(message);
  $('.alert-danger').fadeIn();
}

Template.projects.events({
  'click .btn-edit-project': function(e) {
    $('#projectName').val(this.name);
    $('#projectName').attr('data-id', this._id);
    $('#selectClient').val(this.client);
  },

  'click .btn-cancel': function(e) {
    $('#projectName').val('');
    $('#selectClient').val('None')
  },

  'click .btn-delete-project': function(e) {
    Project.remove({
      '_id': this._id
    });
  },

  'submit #form-project': function(e) {
    $('.alert-danger').hide();
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
      }, function(error, result) {
        displayError(error);
      });
    } else {
      Project.insert({
        'name': name,
        'client': client
      }, function(error, result) {
        console.log(error, result);
        displayError(error);
      });
    }
    $('#projectName').val('')
    $('#selectClient').val('None')
    return false;
  }
});

Template.projects.helpers({
  projects: function() {
    var allprojects = Project.find({}).fetch();
    var allclients = Client.find({}).fetch();
    _.each(allprojects, function(p) {
      var client = _.findWhere(allclients, {
        _id: p.client
      });
      if (client) {
        p.clientName = client.name;
      } else {
        p.clientName = 'None';
      }
    });
    return allprojects;
  },
  clients: function() {
    return Client.find({});
  }
});

Template.projects.rendered = function() {
  $('.alert-danger').hide();
}