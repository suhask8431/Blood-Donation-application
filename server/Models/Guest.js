const mongoose =require('mongoose')
const Schema= mongoose.Schema

var Guest= new Schema(
    {
        fullName: { type: String , required: true },
        isDonor: { type: String , required: true },
        password: { type: String , required: true },
        email_id: { type: String, required: true }
}
);

module.exports=mongoose.model('Guest',Guest)
