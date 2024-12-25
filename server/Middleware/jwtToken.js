import jwt from "jsonwebtoken";

export const jwtMiddleware = (req, res, next) => {
  // get token from cookies

  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwt);

    req.user = decoded;
    console.log("jwt", decoded);

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
