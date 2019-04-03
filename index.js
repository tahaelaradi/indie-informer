const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
const https = require("https");

app.use(cors());
app.use(express.json());

app.post("/search/", function(req, res) {
  console.log(req.body);
  res.send("Returned response!");
});

app.listen(port, function() {
  console.log("Server is running on " + port + " port");
});
