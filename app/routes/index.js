import express from "express";
import authRoute from "./auth.route.js";
import blogRoute from "./blog.route.js";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/",
    route: authRoute,
  },
  {
    path: "/",
    route: blogRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
