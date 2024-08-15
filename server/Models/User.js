const mongoose =require('mongoose')
const Schema= mongoose.Schema

var User= new Schema(
    {
        fullName: { type: String , required: true },
        isDonor: { type: Boolean , required: true },
        password: { type: String , required: true },
        email_id: { type: String, required: true },
        bloodType: { type: String, required: true },
        bio: { type: String, required: true }
}
);

module.exports=mongoose.model('User',User)
