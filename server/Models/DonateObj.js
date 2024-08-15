const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var DonateObj = new Schema({
  reqto: { type: Boolean, required: true },
  chat: { type: String, required: true },
  reqfrom: { type: String, required: true },
});

module.exports = mongoose.model("DonateObj", DonateObj);
