// middlewares/protectRoute.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUserDoc } from "../models/User";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUserDoc;//tipo del documento de usuario
  }
}
const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.header("Authorization");
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Acceso denegado" });
    }

    const token = auth.replace("Bearer ", "").trim();

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload & { userId: string };

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Token no válido" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Token no válido" });
  }
};

export default protectRoute;
