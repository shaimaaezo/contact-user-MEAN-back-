const express = require('express')

const ContactContr = require('./../controller/contactctr.js')
const auth = require('./../userAuth.js')

const contact = express.Router()

contact.route('/')
.get(auth.verifyUser,ContactContr.GetAllcontact)//auth.verifyUser,
.post(auth.verifyUser,ContactContr.PostOne)//auth.verifyUser,auth.verifyAdmin,
.delete(auth.verifyUser,ContactContr.deleteAll)

contact.route('/:contactId')
.put(auth.verifyUser,auth.takeID,auth.IsSame,ContactContr.updateOne)
.delete(auth.verifyUser,ContactContr.deleteOne)//,auth.takeID,auth.IsSame
module.exports = contact;
