const { Schema, model } = require("mongoose");

const Graduation = new Schema({
  level: { type: String, required: true, unique: true },
});

module.exports = model("Graduation", Graduation);
