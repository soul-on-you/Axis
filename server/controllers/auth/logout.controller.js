const RefreshToken = require("../../models/RefreshToken");

const logoutController = (logger) => async (req, res) => {
  try {
    const refreshToken = req.cookies?.jwt;

    if (!refreshToken) {
      return res.status(204).json({ message: "No refresh token" });
    }

    await RefreshToken.findOneAndUpdate(
      { token: refreshToken },
      { token: null, updatedAt: Date.now() }
    );

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    return res.status(204).json({ message: "Logout success" });
  } catch (e) {
    logger.error("Fail user logout with data: ", {
      userId: req.user.user.id,
      error: e.message,
    });
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = logoutController;
