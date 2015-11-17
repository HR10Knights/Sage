var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (process.env.MONGOLAB_URI) {
  mongoose.connect(process.env.MONGOLAB_URI);
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


// var Team = mongoose.model('Team', db.teamsSchema);
// var myTeam = new Team({ name: 'My Team'});
// myTeam.save(function(err) {
//   console.log('okay: err: ' + err);
// });

// var User = mongoose.model('User', db.usersSchema);
// var aUser = new User({ username: 'testuser', password: 'testpass'});
// aUser.save(function(err) {
//   myTeam.users.push(aUser);
//   myTeam.save(function(err) {

//   });
// });
module.exports = db;