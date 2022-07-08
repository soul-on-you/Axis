const { Schema, model, ObjectId } = require("mongoose");

const Student = new Schema({
  userId: { type: ObjectId, unique: true, required: true, ref: "User" }, //!
  tasks: [
    // { type: ObjectId, ref: "Task" },
    {
      detailId: { type: ObjectId, required: true, ref: "Detail3D" }, //!
      order: { type: Number, required: true },
      passed: { type: Boolean, required: true, default: false },
      moderation: { type: Boolean, required: true, default: false },
      moderated: { type: Boolean, required: true, default: false },
      mark: { type: Number, required: false },
      comment: [
        {
          user: { type: ObjectId, required: true, ref: "User" },
          content: { type: String, required: false },
          createdAt: { type: Date, required: false, default: Date.now },
        },
      ],
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
  passed: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("Student", Student);
