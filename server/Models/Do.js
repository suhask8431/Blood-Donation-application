const mongoose =require('mongoose')
const Schema= mongoose.Schema

var Do= new Schema(
    {
        chat: { type: String , required: true },
        reqto: { type: String , required: true },
        reqfrom: { type: String , required: true },
        isDonor: { type: Boolean, required: true },
        BloodType: { type: Boolean, required: true },
        Quantity: { type: Boolean, required: true },
    }
);

module.exports=mongoose.model('Do',Do)
