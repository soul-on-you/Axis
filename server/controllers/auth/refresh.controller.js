const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const RefreshToken = require("../../models/RefreshToken");
const { createRefreshJWT, createAccessJWT } = require("../../utils/createJWT");

const refreshController = (logger) => async (req, res) => {
  try {
    const oldRefreshToken = req.cookies?.jwt;

    if (!oldRefreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    // console.log(oldRefreshToken);

    const foundUser = await RefreshToken.findOne({ token: oldRefreshToken });
    if (!foundUser) {
      return res
        .status(403)
        .json({ message: "Invalid refresh token, not found in DB" });
    }

    let userId;
    try {
      userId = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET).userId;
    } catch (e) {
      return res.status(403).json({ message: "Expired refresh token" });
    }

    const user = await User.findById(userId).populate("role", { "role": 1 });

    if (!user) {
      return res.status(401).json({ message: `Uncorrect refresh token data` });
    }

    const accessToken = await createAccessJWT(user);
    const refreshToken = await createRefreshJWT(user);

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
    logger.error("Fail user refresh him tokens"); //with data: ", { refreshToken }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = refreshController;
