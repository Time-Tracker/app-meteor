Router.route('/projects', function () {
    this.render('projects');
});

Router.route('/project/:id/edit', function () {
    this.render('project');
});

Router.route('/project/new', function () {
    this.render('project');
});

Router.route('/', function () {
    this.render('home');
});