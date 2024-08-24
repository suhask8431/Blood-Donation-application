const mongoose =require('mongoose')
const Schema= mongoose.Schema

var Bank= new Schema(
    {
        fullName: { type: String , required: true },
        isDonor: { type: Boolean , required: true },
        password: { type: String , required: true },
        email_id: { type: String, required: true },
        coords :{ type: String, required:true}
    }
);

module.exports=mongoose.model('Bank',Bank)
