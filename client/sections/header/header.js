var menuItems = [{
  active: 'active',
  link: '/',
  title: 'Home'
}, {
  active: '',
  link: 'clients',
  title: 'Clients'
}, {
  active: '',
  link: 'projects',
  title: 'Projects'
}, {
  active: '',
  link: 'tasks',
  title: 'Tasks'
}, {
  active: '',
  link: 'tasklogs',
  title: 'Task Logs'
}];
Session.set('menuItems', menuItems);

Template.header.events({
  'click .menu-item': function(e) {
    var clickedItem = this;
    Session.set('currentMenuItem', this);
    Router.go(clickedItem.link);
    _.each(menuItems, function(item) {
      item.active = item.link === clickedItem.link ? 'active' : '';
    });
    Session.set('menuItems', menuItems);
  }
});

Template.header.helpers({
  menuItems: function() {
    return Session.get('menuItems');
  }
});

Template.header.rendered = function() {
  console.log(Router.current());
}