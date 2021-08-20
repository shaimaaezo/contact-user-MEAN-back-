const mongoose = require('mongoose')


const contactModel = require('./../models/contact.js')

exports.GetAllcontact = async (req , res , next) => {
  contactModel.find({}).populate('user').then((contact) => {
    res.statusCode = 200;
    res.setHeader('Content-Type' , 'application/json')
    res.json({
      Message: "Get successfully",
      data:contact})
  },(error)=>{res.json({err:error})})
}

exports.PostOne =  async(req , res , next) => {
  console.log('i am here')
  contactModel.create(req.body).then((contact) => {
    req.body.user= req.user._id
    contact.user=req.body.user
    contact.save().then((contact) => {
      contactModel.findById(contact._id).populate('user').then((contact)=>{
        console.log('this is body',contact)
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'application/json')
        res.json({
          Message: "post successfully",
          data:contact})
      })
    })
  }
).catch((err) => {console.log('this is error',err)})
}

exports.deleteAll = async(req,res,next) => {
  contactModel.remove({}).then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type' , 'application/json')
    res.json({
      Message: "delete successfully",
      data:resp})
  })//.catch((err) => {next(err)})
}

exports.updateOne = async (req, res, next) => {
  console.log('i am here')
  contactModel.findByIdAndUpdate(req.params.contactId,{
    $set: req.body
  },{new:true}).then((cont) => {
    if(cont){
      res.statusCode = 200;
      res.setHeader('Content-Type' , 'application/json')
      res.json({
        Message: "post successfully",
        data:cont})
    }else{
      res.statusCode = 403;
      res.setHeader('Content-Type' , 'application/json')
      res.json({error:"this contact is not found"})
    }
  }).catch((err) => res.json({error:err}))
}

exports.deleteOne = async (req, res, next) => {
  contactModel.findByIdAndRemove(req.params.contactId).then((resp) => {
    if(resp){
      res.statusCode = 200;
      res.setHeader('Content-Type' , 'application/json')
      res.json({
        Message: "deleted successfully",
        data:resp
      })
    }else{
      res.statusCode = 403;
      res.setHeader('Content-Type' , 'application/json')
      res.json({error:"this contact is not found"})
    }
  }).catch((err) => res.json({error:err}))
}
