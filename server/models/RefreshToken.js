const { Schema, model, ObjectId } = require("mongoose");

const RefreshToken = new Schema({
  userId: { type: ObjectId, required: true, unique: true, ref: "User" },
  token: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("RefreshToken", RefreshToken);
