const { Schema, model, ObjectId } = require("mongoose");

const User = new Schema({
  serialNumber: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: ObjectId, default: "62a1df56d15e9a4caf9cb1c6", ref: "Role" },
  // role: {
  //   type: String,
  //   enum: ["student", "professor", "admin"],
  //   default: "student",
  // },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("User", User);
