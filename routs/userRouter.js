const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
var jwt = require ('jsonwebtoken')

const user = require('./../models/users')
const auth = require('./../userAuth.js')
const config = require ('./../config.js')

var userRouter = express.Router()
userRouter.use(bodyParser.json())

userRouter.get('/',auth.verifyUser,auth.takeID,(req, res, next) => {
  console.log(req.userID )
  user.findById(req.userID).populate("constacts").then((users) => {
    //console.log('this is users',users)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    res.json(users)
  }).catch((err) => {
    res.json({err:err})
  })
})

userRouter.delete('/',(req,res,next)=>{
  user.remove({}).then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type' , 'application/json')
    res.json(resp)
  })
})

userRouter.post('/signup',auth.Isuser,(req,res,next)=>{
  //console.log('i am in signup')
  user.register(new user({username:req.body.username,password:req.body.password}),req.body.password,(err,user)=>{
    //console.log('i am in regester')
    if(err){
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json');
      res.json({errr:err})
    }else{

      passport.authenticate('local')(req, res, () => {
        var token = auth.jwtCreate({_id:req.user._id})
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true,token:token, status: 'Registration Successful!'});
      })
    }
  })
})

userRouter.post('/login',passport.authenticate('local'),(req,res)=>{
  //console.log(req)
  var token = auth.jwtCreate({_id:req.user._id})
  let decodeToken = jwt.verify(token,config.secreteKey)
  let ID = decodeToken._id;
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true,userID:ID,token:token , status: 'You are successfully logged in!'})
})


module.exports = userRouter
