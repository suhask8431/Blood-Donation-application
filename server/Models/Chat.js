const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Chat = new Schema(
    {
        msgfrom: { type: String, required: true },
        msgto: { type: String, required: true },
        msg: { type: String, required: true },
    }
);

module.exports = mongoose.model('Chat', Chat)
