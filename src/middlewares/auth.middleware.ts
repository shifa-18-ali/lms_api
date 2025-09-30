import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET as string ||'defaultsec';

// Custom request type with user info
const secretKey='mySuperSecretKey123'
interface AuthRequest extends Request {
  user?: any;
}

// ✅ Authentication Middleware
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  // 1. Check if secret exists
  // if (!secretKey) {
  //   console.error("❌ JWT_SECRET is missing in .env file!");
  //   return res.status(500).json({ message: "Internal server error: JWT secret not configured" });
  // }

  // 2. Get token from header
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // 3. Verify token
  try {
    const decoded = jwt.verify(token,secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ Authorization Middleware
export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
