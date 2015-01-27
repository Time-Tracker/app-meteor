Template.clients.events({
  'submit #form-client': function(e) {
    $('.alert-danger').hide();
    var name = $('#client').val();
    var dataId = $('#client').attr('data-id');
    console.log(name, dataId);

    if (dataId) {
      Client.update({
        '_id': dataId
      }, {
        $set: {
          'name': name
        }
      });
    } else {
      Client.insert({
        'name': name
      }, function(error, result) {
        console.log(error.reason);
        $('.alert-danger').html(error.reason);
        $('.alert-danger').fadeIn();
      });
    }
    $('#client').removeAttr('data-id');
    $('#client').removeAttr('value');
    $('#client').val('');
    return false;
  },
  'click .btn-edit-client': function(e) {
    $('#client').val(this.name);
    $('#client').attr('data-id', this._id);
  },
  'click .btn-delete-client': function(e) {
    Client.remove({
      '_id': this._id
    });
  },
});

Template.clients.helpers({
  clients: function() {
    return Client.find({});
  }
});

Template.clients.rendered = function() {
  $('.alert-danger').hide();
}