var BankInfo = new Schema({
    email_id:{type:String, required: true },
    fullName:{type:String, required: true },
    place:{type:String, required: true },
    descr:{type:String, required: true }
});

module.exports=mongoose.model('BankInfo',BankInfo)
