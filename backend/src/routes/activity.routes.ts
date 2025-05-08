import { Router } from "express";
import { GetActivities, GetActivityById , CreateActivity} from "../controllers/activity.controller";
import { createActivityValidator } from "../middleware/activity.validator";

const router = Router();

router.route("/get-activities").get(GetActivities);
router.route("/get-activity:id").get(GetActivityById);
router.route("/create-activity").post(createActivityValidator, CreateActivity);

export default router;