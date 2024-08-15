const Rank = require("../Models/Login_model");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://sumanth:sumanth@blooddonationappcluster.pjoix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const ObjectID = require('mongodb').ObjectID;
getRanks = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Couldnt get Rank bcause of no incoming data from frontend req",
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
        const collection = database.collection("Ranks");
        var result;
        var allUsers;
        collection.find().toArray((err, result) => {
          console.log("all Ranks err" + err);
          console.log("all Ranks" + JSON.stringify(result));
          if (result) {
            return res.status(200).json({ success: true, result: result });
          } else {
            return res
              .status(400)
              .json({
                success: false,
                error: "Ranks could not be found in db",
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

putRanks = (req, res) => {
  console.log("putRanks function in");
  console.log(req);
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Couldnt putRanks  bcause of no incoming data from frontend req",
    });
  }
  const sign = new Rank(body);

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
        const collection = database.collection("Ranks");

        var result;
        collection.insertOne(doc).then((resu) => {
          console.log(
            `${JSON.stringify(resu.insertedId)}  Updated Rank with the _id`
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



updateRanks = (req, res) => {
  console.log("up function in");
  const body = req.body;
  console.log(body);
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Couldnt putRanks  bcause of no incoming data from frontend req",
    });
  }


  
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
        const collection = database.collection("Ranks");

        var result;
        //new ObjectID(body.email_id)
        /*
        { _id: (body.email_id) },
        { $set: body },
        { upsert: true }
        */
        collection.findOne(
          {email_id:req.body.email_id}
          ).then((resu) => {
              console.log(
                `${JSON.stringify(resu)}  fpound Rank with the _id`
              );
              })
        collection.updateOne(
          {email_id:req.body.email_id},
          { $set: body }
      ).then((resu) => {
          console.log(
            `${JSON.stringify(resu)}  Updated Rank with the _id`
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


module.exports = {
  getRanks,
  putRanks,
  updateRanks
};
