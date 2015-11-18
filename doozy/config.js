var mongoose = require('mongoose');
var Schema = mongoose.Schema;

if (process.env.MONGOLAB_URI) {
  mongoose.connect(process.env.MONGOLAB_URI);
} else if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/doozytest');
} else {
  mongoose.connect('mongodb://localhost/doozy');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


db.usersSchema = new Schema ({
  id: Number,
  tasks: [ {type: mongoose.Schema.ObjectId, ref : 'Task'} ], // FIXME "mongoose.Schema.ObjectId is questionable
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  created_at: Date,
  updated_at: Date
});


db.teamsSchema = new Schema({
  id: Number,
  users: [db.usersSchema], // FIXME questionable, not like other
  name: {type: String, required: true, unique: true},
  created_at: Date,
  updated_at: Date
});


db.tasksSchema = new Schema({
  id: Number,
  users: [ {type: mongoose.Schema.ObjectId, ref : 'User'} ],
  name: {
    type: String,
    required: true,
    unique: false,
    validate: [
      function(name) {
        return name.trim().length >= 3;
      },
      'Name too short'
    ]
  },
  description: {
    type: String,
    required: true,
    unique: false,
    validate: [
      function(description) {
        return description.trim().length >= 3;
      },
      'Description too short'
    ]
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  // due_date: Date, // TODO Add this
  created_at: Date,
  updated_at: Date
});


db.projectsSchema = new Schema({
  id: Number,
  tasks: [db.tasksSchema], // FIXME questionable, not like other
  name: {
    type: String,
    required: true,
    unique: true,
    validate: [
      function(name) {
        return name.trim().length >= 3;
      },
      'Name too short'
    ]
  },
  description: {
    type: String,
    required: true,
    unique: true,
    validate: [
      function(description) {
        return description.trim().length >= 3;
      },
      'Description too short'
    ]
  },
  created_at: Date,
  updated_at: Date
});



module.exports = db;
