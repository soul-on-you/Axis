const jwt = require("jsonwebtoken");
const Professor = require("../models/Professor");
const RefreshToken = require("../models/RefreshToken");
const Student = require("../models/Student");
const StudentGroup = require("../models/StudentGroup");

const createAccessJWT = async (user) => {
  /**user
   * {
        _id: new ObjectId("5e9f8f8f8f8f8f8f8f8f8f8"),
        serialNumber: 123456,
        email: 'student@madi.net',
        password: '$2a$06$qdu19o5ZdmeyQX..RLQK/.vqMZ3I2YsE2c8StZoNW6lo7QD2A4b1S',
        role: 'student',
        createdAt: 2022-06-20T07:11:50.648Z,
        updatedAt: 2022-06-20T07:11:50.648Z,
        __v: 0
      }
   */

  let roleProps;
  if (user.role === "student") {
    const student = await Student.findOne({ userId: user.id });

    if (!student) {
      //   return res.status(401).json({ message: "Student not found" });

      return { status: 401, message: "Student not found" };
    }

    roleProps = {
      tasks: [
        ...student.tasks.map((task) => ({
          detailId: task.detailId,
          passed: task.passed,
          moderation: task.moderation,
          comment: task.comment,
        })),
      ],
      passed: student.passed,
    };
  }

  if (user.role === "professor" || user.role === "admin") {
    const professor = await Professor.findOne({ userId: user.id });

    if (!professor) {
      //   return res.status(401).json({ message: "Professor not found" });

      return { status: 401, message: "Professor not found" };
    }

    roleProps = {
      groups: (
        await Promise.all(
          professor.groups.map(
            async (groupId) => await StudentGroup.findById(groupId)
          )
        )
      ).map(({ name, year, archived, students }) => ({
        name,
        year,
        archived,
        students,
      })),
    };
  }

  const accessToken = jwt.sign(
    {
      user: {
        id: user.id,
        serialNumber: user.serialNumber,
        role: user.role,
        avater: user.avatar,
      },
      [user.role]: {
        ...roleProps,
      },
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "1h" }
  );

  return accessToken;
};

const createRefreshJWT = async (user) => {
  const refreshtoken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "1d" }
  );

  await RefreshToken.findOneAndUpdate(
    { userId: user.id },
    { token: refreshtoken, updatedAt: Date.now() }
  );

  return refreshtoken;
};

module.exports = { createAccessJWT, createRefreshJWT };
