import { User } from "../models/user.model";
import { Activity } from "../models/activity.model";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import mongoose from "mongoose";

const options = {
    sameSite: true,
    httpOnly: true,
    secure: true
}

const GenerateJWTToken = async (userID: string): Promise<string | null> => {
    const user = await User.findById(userID);
    if (!user) {
        return null;
    }
    const JWTToken = user.GenerateToken();
    await user.save({ validateBeforeSave: false });
    return JWTToken;
};

const RegisterUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const { name, email, phone, password }:
            { name: string, email: string, phone: number, password: string } = req.body;

        const existingUser = await User.findOne({ email, phone });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const user = await User.create({
            name: name,
            email: email,
            phone: phone,
            password: password
        });
        const JWTToken = await GenerateJWTToken(user._id as string);
        if (!JWTToken) {
            res.status(500).json({ message: "Error generating token" });
            return;
        }
        const CreatedUser = await User.findById(user._id).select("-password");

        res.status(201)
            .cookie("token", JWTToken, options)
            .json({ message: "User registered successfully", CreatedUser });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};

const LoginUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const { email, password }:
            { name: string, email: string, phone: number, password: string } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const JWTToken = await GenerateJWTToken(user._id as string);
        if (!JWTToken) {
            res.status(500).json({ message: "Error generating token" });
            return;
        }
        const LoggedInUser = await User.findById(user._id).select("-password");
        res.status(201)
            .cookie("token", JWTToken, options)
            .json({ message: "User loggedIn successfully", LoggedInUser });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};

const BookActivity = async (req: Request, res: Response) => {
    const { id } = req.query;
    // @ts-ignore
    const user = req.user;
    try {
        const activity = await Activity.findById(id);
        if (!activity) {
            res.status(404).json({ message: "Activity not found" });
            return;
        }
        const ExistingUser = await User.findById(user._id);
        if (!ExistingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        ExistingUser.bookings.push(new mongoose.Types.ObjectId(activity._id as string));
        await ExistingUser.save({ validateBeforeSave: false });
        res.status(200).json({ message: "Activity booked successfully", activity });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

const GetAllBookedActivities = async (req: Request, res: Response) => {
    // @ts-ignore
    const user = req.user;
    try {
        const existingUser = await User.findById(user._id).populate("bookings");
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const bookedActivities = existingUser.bookings;
        if (bookedActivities.length === 0) {
            res.status(404).json({ message: "No booked activities found" });
            return;
        }
        res.status(200).json({ bookedActivities });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

export {
    RegisterUser,
    LoginUser,
    BookActivity,
    GetAllBookedActivities
}