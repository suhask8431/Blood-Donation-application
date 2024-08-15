const mongoose =require('mongoose')
const Schema= mongoose.Schema

var Rank= new Schema(
    {
   email_id: { type: String, required: true  },
   no: { type: Number, required: true  }
}
);

module.exports=mongoose.model('Rank',Rank)
