const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
    res.send(food);
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

module.exports = app;
