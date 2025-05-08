import { User } from "../models/user.model";
import jwt,{ JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface DecodedToken extends JwtPayload {
    id: string;
    email: string;
  }
  

export const VerifyToken = async (req: Request, res: Response, next: NextFunction):Promise<void> => {

    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    // console.log("Token: ", token);
    if (!token) {
        console.log("No token found");
        res.status(401).json({ message: "Unauthorized, you need to login" });
        return;
    }

    try {
        const decoded = jwt.verify(token, String(process.env.JWT_TOKEN_SECRET)) as DecodedToken;
        const DecodedUser = await User.findById(decoded?.id as string).select("-password");
        if (!DecodedUser) {
            console.log("User not found");
            res.status(401).json({ message: "Unauthorized, user not found" });
            return;
        }
        // @ts-ignore
        req.user = DecodedUser;
        return next();
    } catch (error) {

        res.status(401).json({ message: "Unauthorized, invalid token" });
        return;

    }
};