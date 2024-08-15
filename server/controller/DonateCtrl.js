const Donate = require("../Models/Donate");
//const Rank = require("../Models/Rank");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://sumanth:sumanth@blooddonationappcluster.pjoix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
/*
deleteDonate = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Couldnt get Rank bcause of no incoming data from frontend req",
    });
  }
  console.log(body);
  const sign = new Rank(body);

  if (!sign) {
    return res.status(400).json({ success: false, err });
  }

  const doc = sign;
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

        var result;
        Rcollection.updateOne(doc).then((resu) => {
          console.log(`${JSON.stringify(resu)}  Updated Rank with the _id`);
          resultcame = true;
          result = resu;

         
        });
      });
    } catch (e) {
      console.log(e);
    } finally {
      //client.close();
    }
  }
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
        const collection = database.collection("Donate");
        const Rcollection = database.collection("Ranks");
        Rcollection.updateOne(doc).then((resu) => {
          console.log(`${JSON.stringify(resu)}  Updated Rank with the _id`);
          resultcame = true;
          result = resu;
          if (result) {
            res.status(200).json({ success: true, result: result });
          }

          
        });
        var result;
        var allUsers;
        var result;
        let email_id = body.email_id;
        collection.deleteOne({ email_id: email_id }).then((resu) => {
          console.log(`${JSON.stringify(resu)}  deleted `);
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
*/
putDonate = (req, res) => {
  console.log("putDonate function in");
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Couldnt putDonate  bcause of no incoming data from frontend req",
    });
  }
  console.log(body);
  const sign = new Donate(body);
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

 

getDonate = (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "Couldnt get getDonate bcause of no incoming data from frontend req",
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
          const collection = database.collection("Donate");
          var result;
          var allUsers;
          collection.find().toArray((err, result) => {
            console.log("all getDonate err" + err);
            console.log("all getDonate" + JSON.stringify(result));
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
  deleteDonate= (req,res)=>{}

module.exports = {
  deleteDonate,
  putDonate,getDonate
};
