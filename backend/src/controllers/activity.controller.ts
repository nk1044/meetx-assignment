import { Activity } from "../models/activity.model";
import { validationResult } from "express-validator";

const GetActivities = async (req: any, res: any) => {
    try {
        const activities = await Activity.find();
        res.status(200).json({ activities });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const GetActivityById = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const activity = await Activity.findById(id);
        if (!activity) {
            res.status(404).json({ message: "Activity not found" });
            return;
        }
        res.status(200).json({ activity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const CreateActivity = async (req: any, res: any) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
    const { title, description, datetime, location } = req.body;
    try {
        const activity = await Activity.create({
            title: title,
            description: description,
            datetime: datetime,
            location: location
        });
        res.status(201).json({ message: "Activity created successfully", activity });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

export { 
    GetActivities, 
    GetActivityById,
    CreateActivity 
};