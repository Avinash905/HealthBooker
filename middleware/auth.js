const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!verifyToken) {
    return res.status(401).send("Token error");
  }
  req.locals = verifyToken.userId;
  next();
};

module.exports = auth;
