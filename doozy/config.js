var mongoose = require('mongoose');
var Schema = mongoose.Schema;

if (process.env.MONGOLAB_URI) {
  mongoose.connect(process.env.MONGOLAB_URI);
} else if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/doozytest')
} else {
  mongoose.connect('mongodb://localhost/doozy');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


db.usersSchema = new Schema ({
  id: Number,
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  created_at: Date,
  updated_at: Date
});


db.teamsSchema = new Schema({
  users: [db.usersSchema],
  name: {type: String, required: true, unique: true}
});



module.exports = db;