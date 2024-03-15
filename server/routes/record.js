import express from "express";

//this will help us connect to the database
import db from "../db/connection.js";

//this help covert the id from string to ObjectId for the id.
import { ObjectId } from "mongodb";

//router is an instance of the express router
//We use it to define our routes
//The router will be added as a middleware and will take control of requrests starting with path/record
const router = express.Router();

//This section will help you get a list of all the records
router.get("/", async (req, res) => {
  console.log("hello");
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

//This section will get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("records");
  let query = { id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

//this section will help you create a new record
router.post("/", async (req, res) => {
  try {
    // Extract data from the request body
    const {
      Time,
      Temperature,
      "pH Concentration ": pHConcentrationValue,
      "O2 Concentration": O2Concentration,
      "Salinity ": Salinity,
    } = req.body;

    // Convert the string representations of numbers to their appropriate types
    const temperature = parseFloat(Temperature["$numberDouble"]);
    const pHConcentration = parseFloat(pHConcentrationValue["$numberDouble"]);
    const o2Concentration = parseFloat(O2Concentration["$numberDouble"]);
    const salinity = parseFloat(Salinity["$numberDouble"]);

    // Construct the new document
    const newDocument = {
      Time,
      Temperature: temperature,
      "pH Concentration ": pHConcentration,
      "O2 Concentration": o2Concentration,
      "Salinity ": salinity,
    };
    let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

//this sectil will update record by id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        Time: req.body.Time,
        Temperature: parseFloat(req.body.Temperature["$numberDouble"]),
        "pH Concentration ": parseFloat(
          req.body["pH Concentration "]["$numberDouble"]
        ),
        "O2 Concentration": parseFloat(
          req.body["O2 Concentration"]["$numberDouble"]
        ),
        "Salinity ": parseFloat(req.body["Salinity "]["$numberDouble"]),
      },
    };

    let collection = await db.collection("records");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

//this section to delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("records");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
