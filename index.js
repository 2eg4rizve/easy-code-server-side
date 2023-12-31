const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//easyCodeUser
//sXAk98RKUVm4e1Z5

// const uri =
//   "mongodb+srv://easyCodeUser:sXAk98RKUVm4e1Z5@cluster0.mjrato5.mongodb.net/?retryWrites=true&w=majority";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mjrato5.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    const levelCollection = client.db("easyCodeDB").collection("level");
    const levelTitleCollection = client
      .db("easyCodeDB")
      .collection("levelTitle");
    const categoryTitleCollection = client
      .db("easyCodeDB")
      .collection("categoryTitle");
    const resourcesCollection = client.db("easyCodeDB").collection("resources");

    // level add ---------->
    // level post
    app.post("/levelTitle", async (req, res) => {
      try {
        const newLevel = req.body;
        console.log(newLevel);

        const result = await levelTitleCollection.insertOne(newLevel);
        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    // get level title
    app.get("/levelTitle", async (req, res) => {
      try {
        const cursor = levelTitleCollection.find();
        const result = await cursor.toArray();

        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    // Category
    // Category post
    app.post("/categoryTitle", async (req, res) => {
      try {
        const newLevel = req.body;
        console.log(newLevel);

        const result = await categoryTitleCollection.insertOne(newLevel);
        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    // get Category title
    app.get("/categoryTitle", async (req, res) => {
      try {
        const cursor = categoryTitleCollection.find();
        const result = await cursor.toArray();

        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    //level -------->
    //post level code
    app.post("/level", async (req, res) => {
      try {
        const newCode = req.body;
        console.log(newCode);

        const result = await levelCollection.insertOne(newCode);
        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    // get all level code
    app.get("/level", async (req, res) => {
      try {
        const cursor = levelCollection.find();
        const result = await cursor.toArray();

        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    // level code update
    app.put("/level/:id", async (req, res) => {
      try {
        const id = req.params.id;

        console.log("update id : ", id);

        const filter = { _id: new ObjectId(id) };

        const options = { upsert: true };

        const updateCode = req.body;

        const code = {
          $set: {
            ...updateCode,
          },
        };

        const result = await levelCollection.updateOne(filter, book, options);
      } catch (err) {
        console.log(err);
      }
    });
    // level code delete
    app.delete("/level/:id", async (req, res) => {
      try {
        const id = req.params.id;
        console.log("delete id : id");
        const query = { _id: new ObjectId(id) };

        const result = await levelCollection.deleteOne(query);
        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    //Resources

    //Resources post
    app.post("/resources", async (req, res) => {
      try {
        const newResources = req.body;
        console.log(newResources);

        const result = await resourcesCollection.insertOne(newResources);
        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    // get all Resources
    app.get("/resources", async (req, res) => {
      try {
        const cursor = resourcesCollection.find();
        const result = await cursor.toArray();

        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });
    // resources delete
    app.delete("/resources/:id", async (req, res) => {
      try {
        const id = req.params.id;
        console.log("delete id : id");
        const query = { _id: new ObjectId(id) };

        const result = await resourcesCollection.deleteOne(query);
        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("East Code IS RUNNING");
});

app.listen(port, () => {
  console.log(`Easy Code is running on Port , ${port}`);
});
