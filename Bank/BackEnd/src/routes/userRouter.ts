import { Router } from "express";
import {
  changePassword,
  editCurrentUserDetails,
  getCurrentUser,
} from "../controllers/userController.js";
import {
  validateChangePasswordInput,
  validateEditDetailsInput,
} from "../middlewares/validationMiddleware.js";

const router = Router();

// get all users (admin only)
router.get("/admin", () => {});

// get users stats (admin only)
router.get("/admin/stats", () => {});

// get stats of user (admin only)
router.get("/admin/stats/:userID", () => {});

// get current user
router.get("/current", getCurrentUser);

// edit current user details
router.patch(
  "/current/details",
  //@ts-ignore
  validateEditDetailsInput,
  editCurrentUserDetails
);

// edit current user details
//@ts-ignore
router.patch("/current/password", validateChangePasswordInput, changePassword);

export default router;
