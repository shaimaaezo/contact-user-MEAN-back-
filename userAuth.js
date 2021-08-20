const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
var ExtractJwt = require('passport-jwt').ExtractJwt
var JwtStrategy = require('passport-jwt').Strategy
var jwt = require ('jsonwebtoken')

const user = require('./models/users.js')
const contact = require('./models/contact.js')
const config = require ('./config.js')

//local stratigey
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

//create jwt
exports.jwtCreate = function (user){
  return jwt.sign(user , config.secreteKey , {expiresIn: 3600})
}

//jwt stratigy
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secreteKey;

exports.jwtPassportStrategy = passport.use(new JwtStrategy(opts , (jwt_payLoad ,done)=>{
  //console.log('jwt_payLoad:' , jwt_payLoad._id);
  user.findOne({_id:jwt_payLoad._id},(err,user)=>{
    if(err){
      done(err,false)
    }
    else if(user){
      done(null,user)
    }
    else{
      done(null,false)
    }
  })
}))

//req.userID = jwt_payLoad._id
//console.log('hello',userID)

//verify users
exports.verifyUser = passport.authenticate('jwt',{sesssion:false})

//Is user
exports.Isuser = (req, res, next) => {
  if(req.body.username === 'user1' || req.body.username === 'user2'){
    next()
  }else{
    res.status(400)
    .json({error: "this user not will not be register"})
  }
}

//takeID
exports.takeID = (req,res,next) => {
  const token = req.get("Authorization").replace('bearer ','')
  //console.log(token)
  if (!token) {
    return res.status(404).json({
      Message: "Not found",
    });
  }
  //console.log(req.body)
  let decodeToken = jwt.verify(token,config.secreteKey)
  req.userID = decodeToken._id;
  //console.log(decodeToken)
  console.log(req.userID)
  next()

}

//is the same user
exports.IsSame = (req, res, next) => {
    contact.findById(req.params.contactId).then((contact) => {
      //var id = contact.comments.find(auther => auther === req.user._id)
      //if()
      //.comment
      //contact.comments.map(item =>{
      console.log('params',req.params.contactId)
      console.log('user_i',req.user._id)
        if(parseInt(req.params.contactId) === parseInt(req.user._id)){
          next()
        }//else if(req.user.admin){
          //console.log('it is else if')
            //next()
      //  }
        else{
          res.status(400)
          .json({error: "ops! you cant delete this comment"})
        }
      //})
    })
  }
