 
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
  
  module.exports = {
    
    putDonate
  };
  