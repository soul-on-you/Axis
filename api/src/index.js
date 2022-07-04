const express = require("express");
const mongoose = require("mongoose");
const { port, host, db } = require("./configuration");
const { connectDB } = require("./helper/db");
const app = express();
const postSchema = new mongoose.Schema({
  name: String,
});
const Post = mongoose.model("Post", postSchema);

// console.log("PORT", process.env.PORT);

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port: ${port}`);
    console.log(`On host ${host}`);
    console.log(`Our database ${db}`);

    Post.find(function (err, posts) {
      if (err) return console.error(err);
      console.log(`posts: ${posts}`);
    });

    const kitty = new Post({ name: "Kitty" });
    kitty.save(function (err, savedKitty) {
      if (err) return console.error(err);
      console.log(`savedKitty: ${savedKitty.name}`);
    });
  });
};

app.get("/test", (req, res) => {
  res.send("Server working");
});

connectDB()
  .on("error", console.error)
  .on("disconnect", connectDB)
  .once("open", startServer);
