const User = require("../../models/User");
const authController = (logger) => async (req, res) => {
  try {
    const user = await User.findById(req.user.user.id);
    console.log(req.user.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Authentication successful" });
    // user: {
    //   id: user.id,
    //   serialNumber: user.serialNumber,
    //   role: await Role.findById(user.role),
    //   avater: user.avatar,
    // },
    // });
  } catch (e) {
    logger.error("Fail user auth with data: ", {
      userData: { email: req.body.email, password: req.body.password },
    });
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = authController;
