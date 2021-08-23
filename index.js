// Express App Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person");
// MongoDB set up

// Endpoint set up
const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoPort = 27017;
mongoose.connect(`mongodb://mongodb:${mongoPort}/test`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "CONNECTION ERROR"));
db.once("open", function () {
  // Connected
  console.log("Connected to the db");
});

app.get("/", async (req, res) => {
  const people = await Person.find({});

  try {
    res.send(people);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/person", async (req, res) => {
  const person = new Person(req.body);

  try {
    console.log(person);
    await person.save();
    res.send(person);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/person/:id", async (req, res) => {
  
  try {
    await Person.findByIdAndUpdate(req.params.id, req.body);
    await Person.save();
    let person = await Person.findById(req.params.id);
    res.send(person);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/person/:id", async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);

    if (!person) res.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

const port = 5000;

app.listen(port, (err) => {
  console.log(`Listening on port ${port}`);
});
