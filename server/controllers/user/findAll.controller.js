const User = require("../../models/User");
const findAllUserController = (logger) => async (req, res) => {
  try {
    const users = await User.find().populate("role");
    if (!users) return res.status(204).json({ message: "No employees found." });
    return res.status(200).json({ users });
  } catch (e) {
    logger.error("Fail user findAll users with data: ", {
      userData: { email: req.body.email, password: req.body.password },
    });
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = findAllUserController;
