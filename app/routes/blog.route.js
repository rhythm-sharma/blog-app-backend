import express from "express";
import validate from "../middlewares/validate.js";
import blogValidation from "../validations/blog.validation.js";
import blogController from "../controllers/blog.controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/blog",
  auth(),
  validate(blogValidation.create),
  blogController.create
);

router.patch(
  "/blog",
  auth(),
  validate(blogValidation.update),
  blogController.update
);

router.get("/blog/:id", validate(blogValidation.get), blogController.get);

router.get("/blog", auth(), blogController.getAll);

router.delete(
  "/blog/:id",
  auth(),
  validate(blogValidation.remove),
  blogController.remove
);

export default router;
