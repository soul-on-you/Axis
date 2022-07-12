const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.user?.user?.role)
      return res.status(401).json({ message: "Cant find token" });
    if (!allowedRoles.includes(req.user.user.role))
      return res.status(403).json({ message: "Unauthorized" });

    next();
  };
};

module.exports = verifyRoles;
