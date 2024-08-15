const Don= require("../Models/Don");
const Do= require("../Models/Do");
//const Rank = require("../Models/Rank");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://suhaskubasad20:suhas8431@cluster0.dfmgg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



putrDonate = (req, res) => {
    console.log("put D Donate function in latest logg");
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "Couldnt putDonate DonateObj  bcause of no incoming data from frontend req",
      });
    }
    console.log(JSON.stringify(Don));

    console.log(body);
    console.log(typeof(body.isDonor));
    const sign = new Don(body);

    console.log("Don");
    console.log(Don);
    console.log(Don.BloodType);
    console.log(Don.Quantity);
    console.log(sign);
  
    if (!sign) {
      return res.status(400).json({ success: false, err });
    }
  
    const doc = sign;
    var resultcame;
    run().catch(console.dir);
  
    async function run() {
      try {
        const client = new MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverApi: ServerApiVersion.v1,
        });
        await client.connect((err) => {
          if (err) console.log("error while connecting" + err);
          const database = client.db("Profiles");
          const collection = database.collection("Donate");
  
          var result;
          collection.insertOne(doc).then((resu) => {
            console.log(
              `${JSON.stringify(resu.insertedId)}  in donation obj with the _id`
            );
            resultcame = true;
            result = resu;
  
            if (result) {
              return res.status(200).json({ success: true, result: result });
            } else {
              return res
                .status(400)
                .json({ success: false, error: "Couldnt update db" });
            }
          });
        });
      } catch (e) {
        console.log(e);
      } finally {
        //client.close();
      }
    }
  };
  
   
deleteDonate = (req, res) => {
  console.log("delete donate function in");
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Couldnt putDonate DonateObj  bcause of no incoming data from frontend req",
    });
  }
  var resultcame;
  run().catch(console.dir);
console.log(req.body)
  async function run() {
    try {
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });
      await client.connect((err) => {
        if (err) console.log("error while connecting" + err);
        const database = client.db("Profiles");
        const collection = database.collection("Donate");

        var result;
        collection.findOne({chat:req.body.chat,reqto:req.body.reqto,reqfrom:req.body.reqfrom,isDonor:req.body.isDonor}).then((rea)=>{
          console.log(
              `${JSON.stringify(rea)}  in founnd D with th`
            );
        })
        collection.deleteOne({chat:req.body.chat,reqto:req.body.reqto,reqfrom:req.body.reqfrom,isDonor:req.body.isDonor}).then((resu) => {
          console.log(
            `${JSON.stringify(resu)}  in deleted D with the _id`
          );
          resultcame = true;
          result = resu;

          if (result) {
            return res.status(200).json({ success: true, result: result, bodydata: req.body });
          } else {
            return res
              .status(400)
              .json({ success: false, error: "Couldnt delete db" });
          }
        });
      });
    } catch (e) {
      console.log(e);
    } finally {
      //client.close();
    }
  }
};


  module.exports = {
    deleteDonate,
    putrDonate
  };
  