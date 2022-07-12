const request = require("supertest");
process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const createServer = require("./server");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const RefreshToken = require("./models/RefreshToken");
const Student = require("./models/Student");

const server = createServer();

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

  describe("POST /api/auth/register --> register user", () => {
    it("success register case", async () => {
      await request(server)
        .post("/api/auth/registration")
        .send({
          name: "Дмитрий Дмитрий Дима",
          email: "new@test.com",
          password: "new@test.com",
          serialNumber: 123123,
        })
        .expect((data) => {
          console.log(data.body);
        })
        .expect(201, { message: "User created" });
    });

    it("fail case if user is already exist", async () => {
      await request(server)
        .post("/api/auth/registration")
        .send({
          name: "Дмитрий Дмитрий Дима",
          email: "new@test.com",
          password: "new@test.com",
          serialNumber: 123123,
        })
        .expect((data) => {
          console.log(data.body);
        })
        .expect(409, { message: "User with this email already exists" });
    });
  });

  describe("POST /api/auth/login --> login user", () => {
    it("success login case", async () => {
      await request(server)
        .post("/api/auth/login")
        .send({
          email: "new@test.com",
          password: "new@test.com",
        })
        .expect((data) => {
          console.log(data.body);
        })
        .expect(200); //, { accessToken }
    });

    it("fail case user doesn't exist", async () => {
      const email = "new@test.co";
      await request(server)
        .post("/api/auth/login")
        .send({
          email,
          password: "new@test.com",
        })
        .expect((data) => {
          console.log(data.body);
        })
        .expect(401, {
          field: "email",
          message: `User with this ${email} does not exist`,
        }); //, { accessToken }
    });

    it("fail case wrong password", async () => {
      await request(server)
        .post("/api/auth/login")
        .send({
          email: "new@test.com",
          password: "new@test.co",
        })
        .expect((data) => {
          console.log(data.body);
        })
        .expect(401, { field: "password", message: "Wrong password" }); //, { accessToken }
    });

    afterAll(async () => {
      const user = await User.findOne({
        email: "new@test.com",
        serialNumber: 123123,
      });

      await RefreshToken.deleteOne({ userId: user.id });
      await User.findByIdAndDelete(user.id);
    });
  });

  describe("GET /api/auth/auth --> auth user", () => {
    it("successful auth case", async () => {
      const user = new User({
        name: "Дмитрий Дмитрий Дима",
        email: "new_login@test.com",
        password: "new_login@test.com",
        serialNumber: 110011,
      });
      await user.save();

      const userToken = jwt.sign(
        {
          user: {
            id: user.id,
            serialNumber: user.serialNumber,
            role: "admin",
            avater: user.avatar,
          },
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "1h" }
      );

      await request(server)
        .get("/api/auth/auth")
        .set("Authorization", `Bearer ${userToken}`)
        .expect((data) => {
          console.log(data.body);
        })
        .expect(200, { message: "Authentication successful" });

      await User.deleteOne({
        email: "new_login@test.com",
        serialNumber: 110011,
      });
    });

    it("fail case user not found in DB, mean doesn't exist", async () => {
      const userToken = jwt.sign(
        {
          user: {
            id: "62bb6790ce271c52ccd38a87",
            serialNumber: 110011,
            role: "admin",
            avater: null,
          },
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "1h" }
      );

      await request(server)
        .get("/api/auth/auth")
        .set("Authorization", `Bearer ${userToken}`)
        .expect((data) => {
          console.log(data.body);
        })
        .expect(404, { message: "User not found" });
    });

    it("fail case user uncorrect access token on authMiddleware", async () => {
      const userToken = jwt.sign(
        {
          user: {
            id: "62bb6790ce271c52ccd38a87",
            serialNumber: 110011,
            role: "admin",
            avater: null,
          },
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "1ms" }
      );

      await request(server)
        .get("/api/auth/auth")
        .set("Authorization", `Bearer ${userToken}`)
        .expect((data) => {
          console.log(data.body);
        })
        .expect(403, { message: "Unauthorized" });
    });
  });

  describe("GET /api/auth/refresh --> refresh user access and refresh tokens", () => {
    it("success refresh case", async () => {
      let cookie;

      await request(server)
        .post("/api/auth/login")
        .send({
          email: "student@madi.net",
          password: "student@madi.net",
        })
        .expect((data) => {
          console.log(data.headers["set-cookie"]);
          cookie = data.headers["set-cookie"];
          // cookie.toEqual(expect.stringContaining("jwt"));
          expect(cookie[0]).toEqual(expect.stringContaining("jwt"));
        })
        .expect(200);

      console.log(cookie);

      await request(server)
        .get("/api/auth/refresh")
        .set("Cookie", cookie)
        .expect((data) => {
          console.log(data.body);
        })
        .expect(200);
    });

    it("fail case no refresh in cookies", async () => {
      await request(server)
        .get("/api/auth/refresh")
        .expect((data) => {
          console.log(data.body);
        })
        .expect(401, { message: "No refresh token" });
    });

    it("fail case invalid refreshToken, not found in database", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2123IwMWRiNjg5NzVD2e1wdawdGVasdasdOjE2NTY0OTQ4NTUsImV4cCI6MTY1NjU4MTI1NX0.RIdNo9DrTi4yxJ123DAfBO_yq9kDA";

      const cookie = [
        `jwt=${token}; Max-Age=86400; Path=/; Expires=Thu, 28 Jun 2040 10:04:47 GMT; HttpOnly; Secure; SameSite=Strict`,
      ];

      await request(server)
        .get("/api/auth/refresh")
        .set("Cookie", cookie)
        .expect((data) => {
          console.log(data.body);
        })
        .expect(403, { message: "Invalid refresh token, not found in DB" });
    });

    it("fail case invalid refreshToken, expired life time", async () => {
      await RefreshToken.updateOne(
        { userId: "62b01db68975e2905128e333" },
        {
          token: jwt.sign(
            { userId: "62b01db68975e2905128e333" },
            process.env.JWT_REFRESH_SECRET,
            {
              expiresIn: "1ms",
            }
          ),
          updatedAt: Date.now(),
        }
      );

      const token = await RefreshToken.findOne({
        userId: "62b01db68975e2905128e333",
      });
      // console.log("token", token);

      const cookie = [
        `jwt=${token.token}; Max-Age=86400; Path=/; Expires=Thu, 28 Jun 2040 10:04:47 GMT; HttpOnly; Secure; SameSite=Strict`,
      ];

      await request(server)
        .get("/api/auth/refresh")
        .set("Cookie", cookie)
        .expect((data) => {
          console.log(data.body);
        })
        .expect(403, { message: "Expired refresh token" });
    });
  });

  describe("GET /api/auth/logout --> user logout", () => {
    it("success logout case", async () => {
      const { token } = await RefreshToken.findOne({
        userId: "62b01db68975e2905128e333",
      });

      console.log("token", token);

      const cookie = [
        `jwt=${token}; Max-Age=86400; Path=/; Expires=Thu, 28 Jun 2040 10:04:47 GMT; HttpOnly; Secure; SameSite=Strict`,
      ];

      await request(server)
        .post("/api/auth/logout")
        .set("Cookie", cookie)
        .expect((data) => {
          console.log(data.body);
        })
        .expect(204);
    });

    it("success logout case if no refreshToken", async () => {
      await request(server)
        .post("/api/auth/logout")
        .expect((data) => {
          console.log(data.body);
        })
        .expect(204);
    });
  });
});

describe("Details check", () => {
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

  describe("GET /api/detail/ --> get user details", () => {
    it("success gegeeting list case", async () => {
      const user = await User.findOne({
        email: "student2@madi.net",
      });

      console.log(user);
      const userToken = jwt.sign(
        {
          user: {
            id: user.id,
            serialNumber: user.serialNumber,
            role: "student",
            avater: user.avatar,
          },
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "1h" }
      );

      await request(server)
        .get("/api/detail")
        .set("Authorization", `Bearer ${userToken}`)
        .expect((data) => {
          console.log(data.body);
        })
        .expect(200, {
          tasks: [
            {
              title: "nissan gt",
              passed: false,
              moderation: false,
              level: {
                _id: "62a1df56d15e9a4caf9cb1c9",
                level: "easy",
                __v: 0,
              },
            },
            {
              title: "tesla model 3",
              passed: true,
              moderation: false,
              level: {
                _id: "62a1dfa954a4d46a21f560bc",
                level: "hard",
                __v: 0,
              },
            },
            {
              title: "bmw i8",
              passed: false,
              moderation: false,
              level: {
                _id: "62a1dfa954a4d46a21f560bd",
                level: "extra-hard",
                __v: 0,
              },
            },
            {
              title: "tesla model s",
              passed: false,
              moderation: false,
              level: {
                _id: "62a1dfa954a4d46a21f560bc",
                level: "hard",
                __v: 0,
              },
            },
          ],
        });
    });

    it("fail case user isn't student", async () => {
      const userToken = jwt.sign(
        {
          user: {
            id: "21437897689hjcahjdfsi",
            role: "admin",
          },
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "1h" }
      );

      await request(server)
        .get("/api/detail")
        .set("Authorization", `Bearer ${userToken}`)
        .expect((data) => {
          console.log(data.body);
        })
        .expect(403, { message: "You are not student" });
    });

    it("fail case user doesn't exist", async () => {
      const userToken = jwt.sign(
        {
          user: {
            id: "62b01de68975e2222228ece9",
            role: "student",
          },
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "1h" }
      );

      await request(server)
        .get("/api/detail")
        .set("Authorization", `Bearer ${userToken}`)
        .expect((data) => {
          console.log(data.body);
        })
        .expect(404, { message: "Student not found" });
    });
  });

  describe("GET /api/detail/download?detailId=${id} --> download detail by ID", () => {
    it("success download case", async () => {
      const user = await User.findOne({
        email: "student2@madi.net",
      });

      const student = await Student.findOne({ userId: user.id });

      console.log(user);

      const details = [
        ...student.tasks.map((task) => ({
          detailId: task.detailId,
          passed: task.passed,
          moderation: task.moderation,
          comment: task.comment,
        })),
      ];

      const userToken = jwt.sign(
        {
          user: {
            id: user.id,
            serialNumber: user.serialNumber,
            role: "student",
            avater: user.avatar,
          },
          student: {
            details: [
              ...student.tasks.map((task) => ({
                detailId: task.detailId,
                passed: task.passed,
                moderation: task.moderation,
                comment: task.comment,
              })),
            ],
          },
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "1h" }
      );

      await request(server)
        .get("/api/detail/download?detailId=62b561b581e7bb50a6e859b0")
        .set("Authorization", `Bearer ${userToken}`)
        .expect((data) => {
          console.log(data.body);
        })
        .expect(200)
        .expect("Content-Type", "model/gltf-binary")
        .expect("Content-Disposition", `attachment; filename="model.glb"`)
        .expect("Content-Length", "1896");
    });

    it("success register case", async () => {});
  });

  describe("POST /api/detail/upload --> register user", () => {
    it("success register case", async () => {});

    it("success register case", async () => {});
  });
});
