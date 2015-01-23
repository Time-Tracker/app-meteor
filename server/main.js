Project = new Mongo.Collection("project");
Client = new Mongo.Collection("client");
Task = new Mongo.Collection("task");
TaskLog = new Mongo.Collection("tasklog");

var Schemas = {};
Schemas.Client = new SimpleSchema({
  name: {
    type: String,
    max: 200,
    index: true,
    unique: true
  }
});
Client.attachSchema(Schemas.Client);

Schemas.Project = new SimpleSchema({
  name: {
    type: String,
    max: 200,
    index: true,
    unique: true
  },
  client: {
    type: String,
    max: 200,
    index: true
  }
});
Project.attachSchema(Schemas.Project);

Schemas.Task = new SimpleSchema({
  name: {
    type: String,
    max: 200,
    index: true
  },
  project: {
    type: String,
    max: 200,
    index: true
  },
  working: {
    type: Boolean,
    defaultValue: false
  }
});
Task.attachSchema(Schemas.Task);

Schemas.TaskLog = new SimpleSchema({
  task: {
    type: String,
    max: 200,
    index: true
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  }
});
Task.attachSchema(Schemas.Task);

if (Meteor.isServer) {
  console.log('server initalized');
}