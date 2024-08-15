const Guest = require("../Models/Guest");
const { MongoClient, ServerApiVersion } = require("mongodb");
const Rank = require("../Models/Rank");
const uri =
  "mongodb+srv://suhaskubasad20:suhas8431@cluster0.dfmgg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

guestSign = (req, res) => {
  console.log("guestSignup function in");
  console.log(req.body);
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Email id or password not available",
    });
  }
  var sign;
  console.log(typeof body.isDonor);
  console.log(JSON.stringify(body.isDonor));
  console.log(body.isDonor);
  console.log(body.isDonor === "guest");
  console.log(JSON.stringify(body.isDonor === "guest"));
  //return res.status(200)
  /*if(body.isDonor == false){
       sign = new Bank(body);
      console.log("if in")
      console.log(body.isDonor)
      console.log(JSON.stringify(body.isDonor))
    }else{
       sign = new User(body);
    }
    
    if (!sign) {
      return res.status(400).json({ success: false, err });
    }*/
  sign = Guest(req.body);
  var doc = sign;
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
        const Rankcollection = database.collection("Guest");
        Rankcollection.insertOne(doc).then((resu) => {
          console.log(
            `${JSON.stringify(resu.insertedId)} Guest signup  with the _id`
          );
          resultcame = true;
          result = resu;
          if (result) {
            return res.status(200).json({ success: true, result: result });
          } else {
            return res
              .status(400)
              .json({
                success: false,
                error: "Email or password is incorrect",
              });
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

guestLogin = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Email id or password Wrong",
    });
  }
  console.log(body);

  run().catch(console.dir);

  async function run() {
    try {
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });
      await client.connect((err) => {
        if (err) {
          console.log(err);
        }
        const database = client.db("Profiles");
        var collection = database.collection("Guest");;
        
        var result;
        var allUsers, allBanks;
        database
          .collection("Bank")
          .find()
          .toArray((err, result) => {
            console.log("all allBanks err" + err);
            console.log("all allBanks" + JSON.stringify(result));
            allBanks = result;
          });
        database
          .collection("User")
          .find()
          .toArray((err, result) => {
            console.log("all users err" + err);
            console.log("all users" + JSON.stringify(result));
            allUsers = result;
          });
        collection.findOne(body).then((resp) => {
          result = resp;
          console.log(resp);
          console.log(`${JSON.stringify(resp)}  found with the _id`);
          console.log(result);
          if (result) {
            return res
              .status(200)
              .json({
                success: true,
                result: result,
                allUsers: allUsers,
                allBanks: allBanks,
              });
          } else {
            return res
              .status(400)
              .json({
                success: false,
                error: "Email or password is incorrect",
              });
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
    guestSign,
    guestLogin,
};
