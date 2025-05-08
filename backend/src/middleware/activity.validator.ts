import { body } from "express-validator";

export const createActivityValidator = [
  body("title")
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 2 }).withMessage("Title must be at least 2 characters"),

  body("description")
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 2 }).withMessage("Description must be at least 2 characters"),

  body("datetime")
    .notEmpty().withMessage("Datetime is required")
    .isISO8601().toDate().withMessage("Invalid datetime format"),

  body("location")
    .notEmpty().withMessage("Location is required")
    .isLength({ min: 2 }).withMessage("Location must be at least 2 characters"),
];
