import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Failed to authenticate token" });
  }
};

export default verifyToken;
