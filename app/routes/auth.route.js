import express from "express";
import validate from "../middlewares/validate.js";
import authValidation from "../validations/auth.validation.js";
import authController from "../controllers/auth.controller.js";
// import auth from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/login",
  //   auth(),
  validate(authValidation.login),
  authController.login
);

export default router;
