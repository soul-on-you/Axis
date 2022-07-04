process.env.NODE_ENV = "test";
require("dotenv").config({ path: `.${process.env.NODE_ENV}.env` });
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { createAccessJWT, createRefreshJWT } = require("./createJWT");

describe("Auth check", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
      });
    } catch (err) {
      console.error(err);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("Create JWT", () => {
    it("success create access jwt case", async () => {
      const user = await User.findOne({
        email: "student@madi.net",
      });

      const accessToken = await createAccessJWT(user);

      expect(jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)).toEqual(
        expect.objectContaining({
          user: {
            id: expect.any(String),
            serialNumber: expect.any(Number),
            role: expect.any(String),
          },
          student: {
            tasks: expect.any(Array),
            passed: expect.any(Boolean),
          },
          exp: expect.any(Number),
          iat: expect.any(Number),
        })
      );
    });

    it("fail case if user is already exist", async () => {});
  });

  describe("POST /api/auth/login --> login user", () => {
    it("success create refresh jwt case", async () => {
      const user = await User.findOne({
        email: "student@madi.net",
      });

      const refreshToken = await createRefreshJWT(user);

      expect(jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)).toEqual(
        expect.objectContaining({
          userId: expect.any(String),
          exp: expect.any(Number),
          iat: expect.any(Number),
        })
      );
    });

    it("fail case user doesn't exist", async () => {});
  });
});
