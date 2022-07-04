const { Schema, model, ObjectId } = require("mongoose");

const Professor = new Schema({
  userId: { type: ObjectId, required: true, ref: "User" }, //!
  groups: [{ type: ObjectId, ref: "StudentGroup" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("Professor", Professor);
