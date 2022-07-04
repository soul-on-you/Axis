const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    if (!allowedRoles.includes(req.roles)) return res.sendStatus(403);

    //!ЗАПАСНОЙ ВАРИАНТ
    // if (!allowedRoles.some((role) => req.roles.includes(role)))
    //   return res.sendStatus(403);

    next();

    //     const rolesArray = [...allowedRoles];

    //     const result = rolesArray.some((role) => req.roles.includes(role));
    //     if (!result) return res.sendStatus(401);
    //     next();
  };
};

module.exports = verifyRoles;
