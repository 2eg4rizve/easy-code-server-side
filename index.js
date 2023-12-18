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


const uri =
  "mongodb+srv://easyCodeUser:sXAk98RKUVm4e1Z5@cluster0.mjrato5.mongodb.net/?retryWrites=true&w=majority";

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
    app.get("/level",async(req,res)=>{
        try{
            const cursor = levelCollection.find();
            const result = await cursor.toArray();

            res.send(result);

        }catch(err){
            console.log(err)
        }
    });
    // level code update 
    app.put("/level/:id",async(req,res)=>{
        try{
            const id = req.params.id;

            console.log("update id : ",id);

            const filter = {_id : new ObjectId(id)};

            const options = {upsert: true};

            const updateCode = req.body;
            
            const code = {
                $set: {
                    ...updateCode,
                }
            }
            
            const result = await levelCollection.updateOne(filter,book,options); 

        }catch(err){
            console.log(err)
        }
    })
    // level code delete
    app.delete("/level/:id",async(req,res)=>{
        try{
            const id = req.params.id;
            console.log("delete id : id");
            const query = {_id : new ObjectId(id)};

            const result = await levelCollection.deleteOne(query);
            res.send(result);

        } catch (err){
            console.log(err)
        }

    })

    



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
