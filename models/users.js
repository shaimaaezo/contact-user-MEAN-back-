const mongoose = require('mongoose');
const passportPlugin = require('passport-local-mongoose')

const Schema = mongoose.Schema;

var User = new Schema({
  username:{type:String ,default:''},
  password:{type:String ,default:''},
  constacts: [{ type: Schema.Types.ObjectId, ref: 'contact' }]
})

User.plugin(passportPlugin);

module.exports = mongoose.model('User',User)
