import jwt from "jsonwebtoken";
import Users from '../models/auth.js';

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodeData?.id;

    // Check if user exists and has admin role
    const user = await Users.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin privileges required." });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export default adminAuth; 