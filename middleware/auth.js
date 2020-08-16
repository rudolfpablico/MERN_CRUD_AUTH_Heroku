const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth");

  try {
    //Check for token
    if (!token) return res.status(401).json({ msg: "Not authorized" });

    //Verify Token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //Add user from payload
    req.user = decoded;

    next();
  } catch (e) {
    return res.status(400).json({
      msg: "Invalid authorization",
    });
  }
}

module.exports = auth;
