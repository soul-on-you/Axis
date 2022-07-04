require("dotenv").config({ path: `.${process.env.NODE_ENV}.env` });

const express = require("express");

const requestLogger = require("./middleware/request.logger.middleware");
const credentials = require("./middleware/credentials.middleware");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/auth.router");
const detailRouter = require("./routers/detail.router");
const authMiddleware = require("./middleware/auth.middleware");
const errorLogger = require("./middleware/error.logger.middleware");

const createServer = () => {
  const app = express();

  app.use(requestLogger);
  app.use(credentials);
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/auth", authRouter);

  app.use(authMiddleware);

  app.use("/api/detail", detailRouter);

  app.use(errorLogger);

  return app;
};

module.exports = createServer;

// 3dock -док просто хуита
// 3deus - бог
// w3dock - дерьмо
// w3blaDe
// w3b-paper
// 3dock-paper
// x-3d
// intersection - пересечение
// axis - ось
// const Task = require("./models/Task");
// const Student = require("./models/Student");
// const StudentGroup = require("./models/StudentGroup");
// const Professor = require("./models/Professor");
// const Detail3D = require("./models/Detail3D");

// new Student({ userId: "62b01de68975e2905128ece9" }).save();
// new Student({ userId: "62b01ddd8975e2905128ece4" }).save();
// new Student({ userId: "62b01db68975e2905128ecdc" }).save();

// new StudentGroup({
//   name: "2bASU",
//   year: "2020",
//   students: [
//     "62b01de68975e2905128ece9",
//     "62b01ddd8975e2905128ece4",
//     "62b01db68975e2905128ecdc",
//   ],
// }).save();

// new Professor({ userId: "62a8b45d868c22b981b3b2f5", groups: ["62b55d6acbf1bf5d4661c2d2"] }).save();
// new Professor({ userId: "62b01dfd8975e2905128ecee", groups: ["62b55d6acbf1bf5d4661c2d2"] }).save();

// new Detail3D({
//   title: "tesla model s",
//   graduation: "62a1dfa954a4d46a21f560bc",
// }).save();
// new Detail3D({
//   title: "tesla model 3",
//   graduation: "62a1dfa954a4d46a21f560bc",
// }).save();
// new Detail3D({
//   title: "nissan gt",
//   graduation: "62a1df56d15e9a4caf9cb1c9",
// }).save();
// new Detail3D({
//   title: "bmw i8",
//   graduation: "62a1dfa954a4d46a21f560bd",
// }).save();
// new Detail3D({
//   title: "audi r8",
//   graduation: "62a1dfa954a4d46a21f560bb",
// }).save();

// new Task({
//   detail: "62b561b581e7bb50a6e859b0",
//   student: "62b55d4e803412833921cb81",
// }).save();
// new Task({
//   detail: "62b561b581e7bb50a6e859af",
//   student: "62b55d4e803412833921cb81",
// }).save();
// new Task({
//   detail: "62b561b581e7bb50a6e859ae",
//   student: "62b55d4e803412833921cb81",
// }).save();
// new Task({
//   detail: "62b561b581e7bb50a6e859b1",
//   student: "62b55d4e803412833921cb81",
// }).save();
// new Task({
//   detail: "62b561b581e7bb50a6e859b2",
//   student: "62b55d4e803412833921cb82",
// }).save();
