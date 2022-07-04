const Router = require("express");
const router = Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Role = require("../models/Role");
const RefreshToken = require("../models/RefreshToken");
const Logger = require("../loggers");
const authMiddleware = require("../middleware/auth.middleware");

const logger = Logger("auth");

router.post(
  "/registration",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").exists(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    check("serialNumber", "SerialNumber is required").exists(),
    check("serialNumber", "SerialNumber need to be numeric").isNumeric({
      no_symbols: true,
    }),
    check(
      "serialNumber",
      "SerialNumber must be at least 6 characters and less than 8"
    ).isLength({
      min: 6,
      max: 8,
    }),
  ],
  async (req, res) => {
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
  }
);

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").exists(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ message: `User with this ${email} does not exist` });
      }

      const isMatchPasswd = await bcryptjs.compare(password, user.password);

      if (!isMatchPasswd) {
        return res.status(401).json({ message: "Wrong password" });
      }

      const accessToken = jwt.sign(
        {
          user: {
            id: user.id,
            serialNumber: user.serialNumber,
            role: await Role.findById(user.role),
            avater: user.avatar,
          },
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "1h" }
      );

      const refreshtoken = jwt.sign(
        { userId: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "1d" }
      );

      await RefreshToken.findOneAndUpdate(
        { userId: user.id },
        { token: refreshtoken, updatedAt: Date.now() }
        // null,
        // async (err, token) => {
        //   if (err) {
        //     logger.error("Error in finding refresh token", {
        //       userId: user.id,
        //       error: err.message,
        //     });

        //     return res.status(500).json({ message: "Something went wrong" });
        //   }
        // }
      );

      if (req.cookies?.jwt)
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });

      res.cookie("jwt", refreshtoken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
        // sameSite: "None",
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
  }
);

router.get("/logout", async (req, res) => {
  try {
    const refreshToken = req.cookies?.jwt;

    if (!refreshToken) {
      return res.status(204).json({ message: "No refresh token" });
    }

    await RefreshToken.findOneAndUpdate(
      { token: refreshToken },
      { token: null, updatedAt: Date.now() }
      // null
      //   async (err, token) => {
      //   if (err) {
      //     logger.error("Error in finding refresh token", {
      //       token: refreshToken,
      //       error: err.message,
      //     });
      //   }

      //   if (token) {
      //     token.token = null;
      //     await token.save();
      //   }
      // }
    );

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    res.status(204).json({ message: "Logout success" });
  } catch (e) {
    logger.error("Fail user logout with data: ", {
      userId: req.user.user.id,
      error: e.message,
    });
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/auth", authMiddleware, async (req, res) => {
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
});

router.get("/refresh", async (req, res) => {
  try {
    const refreshToken = req.cookies?.jwt;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    // await RefreshToken.findOne({ token: refreshToken }, (err, token) => {
    //   if (err) {
    //     logger.error("Error in finding refresh token, It may be forbidden!", {
    //       token: refreshToken,
    //       tokenData: jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET),
    //       error: err.message,
    //     });
    //   }
    // });

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    const foundUser = await RefreshToken.findOne({ token: refreshToken });
    if (!foundUser) {
      logger.error("Error in finding refresh token", {
        token: refreshToken,
        tokenData: jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET,
          async (err, decoded) => {
            if (err)
              return res.status(403).json({ message: "Invalid refresh token" });

            const hackedUser = await User.findById(decoded.userId);
            return hackedUser;
          }
        ),
        error: err.message,
      });
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const { userId } = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      (error) => {
        if (error) {
          return res.status(403).json({ message: "Expired refresh token" });
        }
      }
    );

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: `Uncorrect refresh token data` });
    }

    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          serialNumber: user.serialNumber,
          role: await Role.findById(user.role),
          avater: user.avatar,
        },
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "1h" }
    );

    const refreshtoken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // await RefreshToken.findOne({ userId: user.id }, async (err, token) => {
    //   if (err) {
    //     logger.error("Error in finding refresh token", {
    //       userId: user.id,
    //       error: err.message,
    //     });

    //     return res.status(500).json({ message: "Something went wrong" });
    //   }

    //   if (token) {
    //     token.token = refreshtoken;
    //     await token.save();
    //   } else {
    //     await new RefreshToken({ userId: user.id, token: refreshtoken }).save();
    //   }
    // });

    await RefreshToken.findOneAndUpdate(
      { userId: user.id },
      { token: refreshtoken, updatedAt: Date.now() }
    );

    res.cookie("jwt", refreshtoken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
      // sameSite: "None",
      secure: true,
    });

    return res.status(200).json({
      accessToken,
    });
  } catch (e) {
    logger.error("Fail user refresh with data: ", { RefreshToken });
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
