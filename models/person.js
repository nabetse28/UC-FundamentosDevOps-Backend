const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
