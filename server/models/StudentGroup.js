const { Schema, model, ObjectId } = require("mongoose");

const StudentGroup = new Schema({
  name: { type: String, required: true }, //!
  year: { type: Number, required: true }, //!
  archived: { type: Boolean, default: false },
  students: [{ type: ObjectId, ref: "Student" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("StudentGroup", StudentGroup);
