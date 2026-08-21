const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  // Check authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {

      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Store decoded user info in request
      req.user = decoded;

      // Continue to next middleware/controller
      next();

    } catch (error) {
      return res.status(401).json({
        message: "Not Authorized, Token Failed",
      });
    }
  }

  // If no token
  if (!token) {
    return res.status(401).json({
      message: "Not Authorized, No Token",
    });
  }
};

module.exports = protect;