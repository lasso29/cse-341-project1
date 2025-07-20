const express = require("express");
const { connectToDb } = require("./db/connect");
const contactsRoute = require("./routes/contacts");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();
const swaggerDocument = YAML.load("./swagger.yaml");

app.use(express.json());
app.use("/contacts", contactsRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  }
});


