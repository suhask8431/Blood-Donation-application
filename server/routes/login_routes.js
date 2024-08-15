const express =require('express')

const logcntrl= require('../controller/Login_control')
const UserCtrl= require('../controller/UserCtrl')
const RankCtrl= require('../controller/RankCtrl')
const BankInfoCtrl= require('../controller/BankInfoCtrl')
const DonateCtrl= require('../controller/DonateCtrl')
const DonateObjCtrl= require('../controller/DonateObjCtrl')
const D= require('../controller/D')
const GuestUser= require('../controller/GuestUser')
const ChatCtrl= require('../controller/ChatCtrl')

const loginrouter=express.Router()

loginrouter.post('/sign', function(req, res){
    console.log("Sign up route in")
    UserCtrl.Sign(req, res)
  });
  loginrouter.post('/guestsign', function(req, res){
    console.log("guest Sign up route in")
    GuestUser.guestSign(req, res)
  });loginrouter.post('/guestlogin', function(req, res){
    console.log("guest login up route in")
    GuestUser.guestLogin(req, res)
  });
  loginrouter.post('/login', function(req, res){
    UserCtrl.Login(req, res)
  });
  loginrouter.get('/test', function(req, res){
    return res.status(200).json({ success: true, Data:"Hi el test resp" });
  });

loginrouter.get('/getRanks', function(req, res){
  RankCtrl.getRanks(req, res)
});
loginrouter.get('/getBloodBanks', function(req, res){
  BankInfoCtrl.getBloodBanks(req, res)
});
loginrouter.post('/putRanks', function(req, res){
  RankCtrl.putRanks(req, res)
});
loginrouter.post('/putBloodBanks', function(req, res){
  BankInfoCtrl.putBloodBanks(req, res)
});

loginrouter.post('/putDonate', function(req, res){
  console.log("pudonate latest loggg up route in")
  D.putrDonate(req, res)
});
loginrouter.get('/getDonate', function(req, res){
  console.log("getDonate route in")
  DonateCtrl.getDonate(req, res)
});
loginrouter.put('/updateRanks', function(req, res){
  RankCtrl.updateRanks(req, res)
});

loginrouter.post('/deleteDonate', function(req, res){
  console.log("Delete up route in")
  D.deleteDonate(req, res)
});

loginrouter.post('/putmsgs', function(req, res){
  console.log("putmsgs  route in")
  ChatCtrl.putMsgs(req, res)
});
loginrouter.get('/getmsgs', function(req, res){
  console.log("getmsgs route in")
  ChatCtrl.getMsgs(req, res)
});

/*
router.post("/userId",logcntrl.userId)
router.post("/sign",logcntrl.SignUp)
router.post("/login",logcntrl.LoginID)
router.post("/rooms",logcntrl.createRooms)
router.post("/BRooms",logcntrl.createBRooms)
router.post("/joinRoom",logcntrl.joinRoom)
router.post("/getrooms",logcntrl.getRooms)
router.post("/deleterooms",logcntrl.deleteRoom)
*/
//module.exports=router

module.exports=loginrouter;