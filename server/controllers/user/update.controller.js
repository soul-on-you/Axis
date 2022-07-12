const User = require("../../models/User");
const Role = require("../../models/Role");
const RefreshToken = require("../../models/RefreshToken");
const Student = require("../../models/Student");
const Professor = require("../../models/Professor");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const updateUserController = (logger) => async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, serialNumber, name, role, id } = req.body;

    const user = await User.findById(id);

    if (!user)
      return res.status(404).json({ message: "User with this id not found" });

    const hashedPassword = await bcryptjs.hash(password, 6);

    const roleDB = await Role.findOne({ role: role });

    console.log(roleDB.id);
    console.log(user.role);
    console.log(roleDB.id == user.role);
    if (user.role != roleDB.id) {
      logger.info(`Change role user from ${user.role} to ${role}: `, {
        userData: {
          id: user.id,
          howChanged: { id: req.user.user.id, name: req.user.user.name },
        },
      });
      if (role === "professor" || role === "admin") {
        if (req.body.rewrite) {
          await Student.findOneAndDelete({ userId: user.id });
        }
        await new Professor({ user: user.id }).save();
      } else {
        if (req.body.rewrite) {
          await Professor.findOneAndDelete({ userId: user.id });
        }
        await new Student({ userId: user.id }).save();
      }
    }

    user.email = email;
    user.password = hashedPassword;
    user.serialNumber = serialNumber;
    user.name = name;
    user.role = roleDB.id;
    user.updatedAt = Date.now();

    // if (role.role === "professor" || role.role === "admin") {
    //   await new Professor({ user: user.id }).save();
    // } else {
    //   await new Student({ userId: user.id }).save();
    // }

    await user.save();

    if (req.body.reset)
      await RefreshToken.findOneAndUpdate(
        { userId: user.id },
        { token: "", updatedAt: Date.now() }
      );

    return res.status(201).json({ message: "User created" });
  } catch (e) {
    console.error(e);
    logger.error("Fail user update with data: ", {
      userData: { email: req.body.email, password: req.body.password },
    });
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = updateUserController;
