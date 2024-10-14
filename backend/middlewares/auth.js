const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_TOKEN;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_TOKEN);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status().json({ success: false, message: "" });
  }
};
