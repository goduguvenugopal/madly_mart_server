const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRETKEY;

// verifying token
const verifyToken = (request, response, next) => {
  try {
    const token = request.headers.token;
    if (!token) {
      return response.status(404).json({ message: "token not found" });
    }
    const decodedId = jwt.verify(token, secretKey);
    request.userId = decodedId.userId;
    next();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

module.exports = verifyToken;
