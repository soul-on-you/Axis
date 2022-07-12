const User = require("../../models/User");
const findUserController = (logger) => async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role"); //req.query.id
    if (!user) return res.status(204).json({ message: "User not found." });
    return res.status(200).json({ user });
  } catch (e) {
    logger.error("Fail user auth with data: ", {
      userData: { email: req.body.email, password: req.body.password },
    });
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = findUserController;
