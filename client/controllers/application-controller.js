Project = new Mongo.Collection("project");
Client = new Mongo.Collection("client");
Task = new Mongo.Collection("task");
TaskLog = new Mongo.Collection("tasklog");

ApplicationController = RouteController.extend({
  layoutTemplate: 'AppLayout',

  index: function() {
    this.render('home');
  },

  onBeforeAction: function() {
    console.log('app before hook!');
    this.next();
  },

  action: function() {
    console.log('this should be overridden!');
  }
});