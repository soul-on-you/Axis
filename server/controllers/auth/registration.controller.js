const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../../models/User");
const RefreshToken = require("../../models/RefreshToken");

const registrationController = (logger) => async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, serialNumber } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate)
      return res
        .status(409)
        .json({ message: "User with this email already exists" });

    const hashedPassword = await bcryptjs.hash(password, 6);

    const user = new User({ email, password: hashedPassword, serialNumber });
    await user.save();

    await new RefreshToken({ userId: user.id }).save();

    return res.status(201).json({ message: "User created" });
  } catch (e) {
    logger.error("Fail user register with data: ", {
      userData: { email: req.body.email, password: req.body.password },
    });
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = registrationController;
