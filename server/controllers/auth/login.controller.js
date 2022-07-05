const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../../models/User");
const { createAccessJWT, createRefreshJWT } = require("../../utils/createJWT");

const loginController = (logger) => async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("role", { "role": 1 });
    if (!user) {
      return res
        .status(401)
        .json({
          field: "email",
          message: `User with this ${email} does not exist`,
        });
    }

    const isMatchPasswd = await bcryptjs.compare(password, user.password);

    if (!isMatchPasswd) {
      return res
        .status(401)
        .json({ field: "password", message: "Wrong password" });
    }

    const accessToken = await createAccessJWT(user);
    const refreshToken = await createRefreshJWT(user);

    if (req.cookies?.jwt)
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: true,
    });

    return res.status(200).json({
      accessToken,
    });
  } catch (e) {
    console.error(e);
    logger.error("Fail user login with data: ", {
      userData: { email: req.body.email, password: req.body.password },
    });
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = loginController;
