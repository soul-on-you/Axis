const { Schema, model, ObjectId } = require("mongoose");

const Detail3D = new Schema({
  title: { type: String, required: true }, //!
//   path: { type: String, required: true }, //!
  graduation: { type: ObjectId, required: true, ref: "Graduation" }, //!
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("Detail3D", Detail3D);
