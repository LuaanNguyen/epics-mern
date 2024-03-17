// Set up express router
import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/connection.js";

const router = express.Router();

// Get all records
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("records");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving records");
  }
});

// Get a single record by id
router.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("records");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);
    if (!result) res.status(404).send("Record not found");
    else res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving record");
  }
});

// Create a new record
router.post("/", async (req, res) => {
  try {
    const {
      Time,
      Temperature,
      "pH Concentration ": pHConcentration,
      "O2 Concentration": O2Concentration,
      "Salinity ": Salinity,
    } = req.body;

    // Parse number fields from $numberDouble strings
    const temperature = parseFloat(Temperature["$numberDouble"]);
    const pHConcentrationValue = parseFloat(pHConcentration["$numberDouble"]);
    const o2Concentration = parseFloat(O2Concentration["$numberDouble"]);
    const salinity = parseFloat(Salinity["$numberDouble"]);

    // Construct new document
    const newDocument = {
      Time,
      Temperature: temperature,
      "pH Concentration": pHConcentrationValue,
      "O2 Concentration": o2Concentration,
      Salinity: salinity,
    };

    const collection = db.collection("records");
    const result = await collection.insertOne(newDocument);
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding record");
  }
});

// Update record by id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        Time: req.body.Time,
        Temperature: parseFloat(req.body.Temperature["$numberDouble"]),
        "pH Concentration": parseFloat(
          req.body["pH Concentration "]["$numberDouble"]
        ),
        "O2 Concentration": parseFloat(
          req.body["O2 Concentration"]["$numberDouble"]
        ),
        Salinity: parseFloat(req.body["Salinity "]["$numberDouble"]),
      },
    };

    const collection = db.collection("records");
    const result = await collection.updateOne(query, updates);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating record");
  }
});

// Delete record by id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("records");
    const result = await collection.deleteOne(query);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting record");
  }
});

export default router;
