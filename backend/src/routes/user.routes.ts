import { Router } from "express";
import { registerUserValidator, loginUserValidator } from "../middleware/auth.validator";
import { RegisterUser, LoginUser, BookActivity, GetAllBookedActivities } from "../controllers/user.controller";
import {VerifyToken} from "../middleware/auth.middleware";

const router = Router();

router.route("/register").post(registerUserValidator, RegisterUser);
router.route("/login").post(loginUserValidator, LoginUser);
router.route("/book-activity").post(VerifyToken, BookActivity);
router.route("/get-booked-activities").get(VerifyToken, GetAllBookedActivities);

export default router;