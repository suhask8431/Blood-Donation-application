const User = require("../Models/User");
const Bank = require("../Models/Bank");
const { MongoClient, ServerApiVersion } = require("mongodb");
const Rank = require("../Models/Rank");
const uri =
  "mongodb+srv://sumanth:sumanth@blooddonationappcluster.pjoix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

Sign = (req, res) => {
  console.log("Signup function in");
  console.log(req.body);
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Email id or password not available",
    });
  }
  var sign;
  
  // console.log(JSON.stringify(body.isDonor));
   //console.log(body.isDonor === "true");
   //console.log(JSON.stringify(body.isDonor === "false"));
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
    var ob = {
      email_id : body.email_id,
      no : 0
    }
  var rankdoc = Rank(ob)
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
      var rank_res;
      await client.connect((err) => {
        if (err) console.log("error while connecting" + err);
        const database = client.db("Profiles");
        const Rankcollection = database.collection("Ranks");
        Rankcollection.insertOne(rankdoc).then((resu) => {
          console.log(
            `${JSON.stringify(resu.insertedId)}  created Rank with the _id`
          );
          resultcame = true;
          result = resu;
          rank_res=result;
          //if (result) {res.status(200).json({ success: true, result: result });}
          /*if (result) {
            return res.status(200).json({ success: true, result: result });
          } else {
            return res
              .status(400)
              .json({ success: false, error: "Couldnt update db" });
          }*/
        });
        var collection;
        console.log(typeof body.isDonor);
  console.log(body.isDonor);

        if (body.isDonor) {
          doc = new User(body);

          collection = database.collection("User");
          console.log("collection user");
        } else {
          doc = new Bank(body);

          collection = database.collection("Bank");
          console.log("collection Bank");
        }
        if (!doc) {
          return res.status(400).json({ success: false, err });
        }
        var result;
        collection.insertOne(doc).then((resu) => {
          console.log(
            `${JSON.stringify(resu.insertedId)}  inserted with the _id`
          );
          resultcame = true;
          result = resu;

          if (result) {
            return res.status(200).json({ success: true, result: result, rank_res });
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

Login = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Email id or password not available",
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
        var collection;
        if (body.isDonor === true) {
          collection = database.collection("User");
          console.log("user colelctop login");
        } else {
          console.log("bakn colelctop login");
          collection = database.collection("Bank");
        }
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
          //if(allUsers && allBanks)
          setTimeout(() => {
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

        }, 1000);
          
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
  Sign,
  Login,
};
