const Chat = require("../Models/Chat");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri ="mongodb+srv://sumanth:sumanth@blooddonationappcluster.pjoix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"



getMsgs = (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "Couldnt get get msgs bcause of no incoming data from frontend req",
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
          const collection = database.collection("Chat");
          var result; 
          var allUsers;
          collection.find()
          .toArray((err,result)=>{
            console.log("all getmsgs err"+ err)
            console.log("all getmsgs"+ JSON.stringify(result))
  
            if (result) {
              return res.status(200).json({ success: true, result: result});
            } else {
              return res
                .status(400)
                .json({ success: false, error: "getmsgs could not be found in db" });
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
  
  
  putMsgs = (req, res) => {
    console.log("putMsgs function in")
    //console.log(req)
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "Couldnt putMsgs  bcause of no incoming data from frontend req",
      });
    }
    const sign = new Chat(body);
    
    if (!sign) {
      return res.status(400).json({ success: false, err });
    }
  
    const doc = sign;
    console.log("msg chat doc")
    console.log(doc)
    var resultcame;
    run().catch(console.dir);
  
    async function run() {
      try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        await client.connect(err => {
          if(err)console.log("error while connecting" + err)
          const database = client.db("Profiles");
        const collection = database.collection("Chat");
        
        
        var result;  
        collection.insertOne(doc)
        .then(resu=>{
          console.log(
            `${JSON.stringify(resu.insertedId)} putMsgs  with the _id`
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
    getMsgs,
    putMsgs,
  };