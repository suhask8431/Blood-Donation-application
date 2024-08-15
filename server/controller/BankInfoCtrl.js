const BankInfo = require("../Models/Login_model");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri ="mongodb+srv://suhaskubasad20:suhas8431@cluster0.dfmgg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"





getBloodBanks = (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "Couldnt get getBloodBanks bcause of no incoming data from frontend req",
      });
    }
    console.log(body);
  
    run().catch(console.dir);
  
    
    async function run() {
      try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        await client.connect(err => {
          if (err) {console.log(err)}
          const database = client.db("Profiles");
          const collection = database.collection("BloodBanks");
          var result; 
          var allUsers;
          collection.find()
          .toArray((err,result)=>{
            console.log("all getBloodBanks err"+ err)
            console.log("all getBloodBanks"+ JSON.stringify(result))
  
            if (result) {
              return res.status(200).json({ success: true, result: result});
            } else {
              return res
                .status(400)
                .json({ success: false, error: "getBloodBanks could not be found in db" });
            }
          })
      
        });
        
      }catch(e){
        console.log(e)
      }  finally {
        //client.close();
        
      }
    }
  };
  
  
  putBloodBanks = (req, res) => {
    console.log("putBloodBanks function in")
    //console.log(req)
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "Couldnt putBloodBanks  bcause of no incoming data from frontend req",
      });
    }
    const sign = new BankInfo(body);
    
    if (!sign) {
      return res.status(400).json({ success: false, err });
    }
  
    const doc = sign;
    console.log("doc")
    console.log(doc)
    var resultcame;
    run().catch(console.dir);
  
    async function run() {
      try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        await client.connect(err => {
          if(err)console.log("error while connecting" + err)
          const database = client.db("Profiles");
        const collection = database.collection("BankInfo");
        
        
        var result;  
        collection.insertOne(doc)
        .then(resu=>{
          console.log(
            `${JSON.stringify(resu.insertedId)} BankInfo Updated Rank with the _id`
          );
          resultcame=true;
          result = resu;
          
          if (result) {
            return res.status(200).json({ success: true, result: result });
          } else {
            return res
              .status(400)
              .json({ success: false, error: "Couldnt update db" });
          }
        })
        });
        
      }catch(e){
        console.log(e)
      } finally {
        //client.close();
      }
    }
  };


  
  module.exports = {
    getBloodBanks,
    putBloodBanks,
  };