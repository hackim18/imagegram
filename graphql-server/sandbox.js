require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const uri = "mongodb+srv://hakim:XDgV2OX5mK99VLMi@cluster0.uykeidp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = process.env.MONGO_DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// async function run() {
//   try {
//     // Send a ping to confirm a successful connection
//     await client.db("Social-Media-App").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     await client.close();
//   }
// }

async function run() {
  try {
    // Connect to the "insertDB" database and access its "haiku" collection
    const database = client.db("Social-Media-App");
    const users = database.collection("users");

    // Create a document to insert
    const doc = {
      name: "John Wick 4",
      username: "cgremain0",
      email: "cgremain0@go.com",
      password: "zF5onZ@kD",
    };
    // Insert the defined document into the "haiku" collection
    const result = await users.insertOne(doc);

    // const result = await users.findOne({ _id: new ObjectId("66017d0665f63a5605594b4c") });

    // const result = await users.find({}).toArray();

    console.log(result);
    // Print the ID of the inserted document
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    // Close the MongoDB client connection
    await client.close();
  }
}

run().catch(console.dir);
