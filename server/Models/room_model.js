const mongoose =require('mongoose')
const Schema= mongoose.Schema

var Rooms = new Schema(
    {
    name: { type: String }
}
);
module.exports=mongoose.model('rooms',Rooms)