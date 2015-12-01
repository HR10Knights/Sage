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


db.orgSchema = new Schema ({
    title: String,
    projects: [db.projectsSchema]
});

db.projectsSchema = new Schema ({
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
  teamLead: {type: Schema.Types.ObjectID, ref: 'User'} // ref user
  teamMembers: [{type: Schema.Types.ObjectID, ref: 'User'}],
  unregisteredUsers: String, 
  tasks: [db.tasksSchema],
  deadline: Date
});

db.tasksSchema = new Schema ({
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
    required: false,
    unique: false,
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  deadline: {
    type: Date,
    required: false,
    unique: false
  }
  assignee: {type: Schema.Types.ObjectID, ref: 'User'} //ref user
});

db.usersSchema = new Schema ({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required true},
  organization: {type: Schema.Types.ObjectId, ref: 'Org'},
  project_list: [{ type: Schema.Types.ObjectId, ref: 'Org' }],
  task_list: [{ type: Schema.Types.ObjectId, ref: 'Org' }] 
});

module.exports = db;
