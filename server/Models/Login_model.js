const mongoose =require('mongoose')
const Schema= mongoose.Schema

/*var Login= new Schema(
    {
   email_id: { type: String, required: true },
   password: { type: String , required: true },
   fullName: { type: String , required: true },
   isDonor: { type: Boolean , required: true }
}
);*/
var BloodBank= new Schema(
    {
   email_id: { type: String, required: true  },
   desc: { type: String, required: true  },
   loc: { type: String, required: true  }
}
);


module.exports=mongoose.model('BloodBank',BloodBank)
//module.exports=mongoose.model('login',Login)

