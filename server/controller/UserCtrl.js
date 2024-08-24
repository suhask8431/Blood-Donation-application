const User = require("../Models/User");
const Bank = require("../Models/Bank");
const Rank = require("../Models/Rank");
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://suhaskubasad20:suhas8431@cluster0.dfmgg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function checkEmailExists(email) {
  try {
    await client.connect();
    const database = client.db("Profiles");
    const userCollection = database.collection("User");
    const bankCollection = database.collection("Bank");

    const userExists = await userCollection.findOne({ email_id: email });
    const bankExists = await bankCollection.findOne({ email_id: email });

    if (userExists || bankExists) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw new Error("Error checking email existence");
  } finally {
    await client.close();
  }
}

const Sign = async (req, res) => {
  console.log("Signup function in");
  console.log(req.body);
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Email id or password not available",
    });
  }

  try {
    const emailExists = await checkEmailExists(body.email_id);

    if (emailExists) {
      return res.status(400).json({
        success: false,
        error: "Email already in use",
      });
    }

    await client.connect();
    const database = client.db("Profiles");
    const RankCollection = database.collection("Ranks");
    let collection;
    let doc;

    if (body.isDonor) {
      doc = new User(body);
      collection = database.collection("User");
    } else {
      doc = new Bank(body);
      collection = database.collection("Bank");
    }

    if (!doc) {
      return res.status(400).json({ success: false, error: "Invalid user data" });
    }

    const rankdoc = new Rank({ email_id: body.email_id, no: 0 });
    const rankResult = await RankCollection.insertOne(rankdoc);
    const userResult = await collection.insertOne(doc);

    if (userResult.insertedId && rankResult.insertedId) {
      return res.status(200).json({
        success: true,
        result: userResult,
        rank_res: rankResult,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Failed to create user",
      });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  } finally {
    await client.close();
  }
};

const Login = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Email id or password not available",
    });
  }

  console.log(body);

  try {
    await client.connect();
    const database = client.db("Profiles");
    let collection;

    if (body.isDonor === true) {
      collection = database.collection("User");
    } else {
      collection = database.collection("Bank");
    }

    const allUsers = await database.collection("User").find().toArray();
    const allBanks = await database.collection("Bank").find().toArray();
    const result = await collection.findOne(body);

    if (result) {
      return res.status(200).json({
        success: true,
        result: result,
        allUsers: allUsers,
        allBanks: allBanks,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Email or password is incorrect",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  } finally {
    await client.close();
  }
};

module.exports = {
  Sign,
  Login,
};
