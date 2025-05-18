const express = require("express");
const router = express.Router();
const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

// GET all contacts
router.get("/", async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection("contact").find().toArray(); // collection: 'contact'
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single contact by ID
router.get("/:id", async (req, res) => {
  try {
    const db = getDb();
    const contact = await db
      .collection("contact")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!contact) return res.status(404).json({ error: "Not found" });

    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new contact
router.post("/", async (req, res) => {
  try {
    const db = getDb();
    console.log("Received body:", req.body); // 🔍 Debug line
    console.log(req.body);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const result = await db.collection("contact").insertOne(contact);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
