const createServer = require("./server");
const mongoose = require("mongoose");

const app = createServer();

const start = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
      },
      () => console.log("mongo connected")
    );

    app.listen(process.env.PORT, () =>
      console.log(`Server started on port ${process.env.PORT}`)
    );
  } catch (err) {
    console.error(err);
  }
};

start();
