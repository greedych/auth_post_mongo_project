import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

function authJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Forbodden: Invalid expired token" });
      }

      req.user = user;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ message: "Unautorized: No token provided or it's invalid" });
  }
}

export { authJWT };
