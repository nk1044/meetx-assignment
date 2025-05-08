import { Schema, model, Document } from "mongoose";


interface IActivity extends Document {
    title: string;
    description: string;
    location: string;
    datetime: Date;
    createdAt: Date;
    updatedAt: Date;
  }

const activitySchema = new Schema<IActivity>({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    datetime: {
        type: Date,
        required: true,
    }
}, { timestamps: true });

export const Activity = model("Activity", activitySchema);