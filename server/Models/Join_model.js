const mongoose = require('mongoose')
const Schema= mongoose.Schema

var joinR = new Schema(
    {
        username: { type: String },
        userMail: { type: String },
        name:{ type: String },
    }
);
module.exports=mongoose.model('joinR',joinR);