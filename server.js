const express = require("express");
const { connectToDb } = require("./db/connect");
const contactsRoute = require("./routes/contacts");

const app = express();
app.use(express.json()); // ✅ This is needed to parse JSON

app.use("/contacts", contactsRoute); // ✅ Route should come AFTER middleware

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  }
});
