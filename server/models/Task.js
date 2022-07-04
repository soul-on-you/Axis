const { Schema, model, ObjectId } = require("mongoose");

const Task = new Schema({
  // title: { type: String, required: true }, //!
  detail: { type: ObjectId, required: true }, //!
  passed: { type: Boolean, required: true, default: false },
  moderation: { type: Boolean, required: true, default: false },
  mark: { type: Number, required: false },
  // graduation: { type: ObjectId, required: true, ref: "Graduation" }, //!
  comment: { type: String, required: false },
  student: { type: ObjectId, required: true,ref: "Student" }, //!
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("Task", Task);
