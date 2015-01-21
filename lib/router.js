Router.route('/', function () {
    this.render('home');
});

Router.route('/projects', {
    controller: 'ProjectController',
    action: 'index'
});

Router.route('/project/new', {
    controller: 'ProjectController',
    action: 'new'
});