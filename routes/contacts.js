const express = require("express");
const router = express.Router();
const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

// GET all contacts
router.get("/", async (req, res) => {
  const db = getDb();
  try {
    const contacts = await db.collection("contact").find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single contact
router.get("/:id", async (req, res) => {
  const db = getDb();
  try {
    const contact = await db.collection("contact").findOne({ _id: new ObjectId(req.params.id) });
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new contact
router.post("/", async (req, res) => {
  const db = getDb();
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  try {
    const result = await db.collection("contact").insertOne(contact);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update contact
router.put("/:id", async (req, res) => {
  const db = getDb();
  try {
    const result = await db.collection("contact").replaceOne(
      { _id: new ObjectId(req.params.id) },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Contact not found or not updated" });
    }

    res.status(204).send(); // success, no content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE contact
router.delete("/:id", async (req, res) => {
  const db = getDb();
  try {
    const result = await db.collection("contact").deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(204).send(); // success, no content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
