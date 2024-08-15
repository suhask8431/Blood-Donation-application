const mongoose =require('mongoose')
const Schema= mongoose.Schema

var Don= new Schema(
    {
        chat: { type: String , required: true },
        reqto: { type: String , required: true },
        reqfrom: { type: String , required: true },
        isDonor: { type: Boolean, required: true },
        BloodType: { type: String, required: true },
        Quantity: { type: Number, required: true },
}
);

module.exports=mongoose.model('Don',Don)
