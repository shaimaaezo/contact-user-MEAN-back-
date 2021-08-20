const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const contact = new Schema({
//  _id:mongoose.Schema.Types.ObjectId,
  name:{type:String,required:true},
  phone:{type:String,required:true},
  address:{type:String},
  Note:{type:String},
  user:{type: Schema.Types.ObjectId, ref: 'User'}
},{
    timestamps:true
})

module.exports = mongoose.model('contact',contact)
