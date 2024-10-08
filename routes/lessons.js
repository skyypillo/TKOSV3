import express from "express";
import { lessonDB } from "../db/connection.js";
import { ObjectId } from "mongodb";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// This section will help you get a list of all the lessons.
router.get("/", async (req, res) => {
  let collection = await lessonDB.collection("lessons");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single lesson from the list.
router.get("/:id", async (req, res) => {
  let collection = await lessonDB.collection("lessons");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Need to add comments
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        comments: req.body.comments,
      },
    };

    let collection = await lessonDB.collection("lessons");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

export default router;
