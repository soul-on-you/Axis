const User = require("../../models/User");
const deleteUserController = (logger) => async (req, res) => {
  try {
    // const user = await User.findById(req.user.user.id);

    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    // return res.status(200).json({ message: "Authentication successful" });

    const id = req.body.id;
    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: "User deleted" });
  } catch (e) {
    logger.error("Fail user auth with data: ", {
      userData: { email: req.body.email, password: req.body.password },
    });
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = deleteUserController;
