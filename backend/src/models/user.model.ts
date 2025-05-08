import { Schema, model, Document, Types } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    name: string;
    email: string;
    phone: number;
    password: string;
    bookings: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
    GenerateToken: () => string;
  }

const userSchema = new Schema<IUser>({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bookings: {
      type: [Schema.Types.ObjectId],
      ref: "Activity",
      default: [],
    },
  }, { timestamps: true });
  

userSchema.pre("save", async function (next) {
    try {
      if (!this.isModified("password")) return next();
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (error) {
      console.log(error);
      next();
    }
  });
  
userSchema.methods.comparePassword = function(password: string) {
    return bcrypt.compare(password, this.password);
};


userSchema.methods.GenerateToken = function () {
    const JWTToken = jwt.sign(
        {
          id: this._id,
          email: this.email
        },
        process.env.JWT_TOKEN_SECRET as string,
        {
          expiresIn: process.env.JWT_TOKEN_EXPIRATION as any,
        }
      );
      
    return JWTToken;
};

export const User = model("User", userSchema);