const { Schema, model, ObjectId } = require("mongoose");

const Student = new Schema({
  userId: { type: ObjectId, unique: true, required: true, ref: "User" }, //!
  tasks: [
    // { type: ObjectId, ref: "Task" },
    {
      detailId: { type: ObjectId, required: true, ref: "Detail3D" }, //!
      passed: { type: Boolean, required: true, default: false },
      moderation: { type: Boolean, required: true, default: false },
      mark: { type: Number, required: false },
      comment: { type: String, required: false },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
  passed: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("Student", Student);
