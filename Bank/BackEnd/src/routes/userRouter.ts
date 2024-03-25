import { Router } from "express";
import {
  editCurrentUserDetails,
  getCurrentUser,
} from "../controllers/userController.js";
import { validateEditDetailsInput } from "../middlewares/validationMiddleware.js";

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
//@ts-ignore
router.patch("/current", validateEditDetailsInput, editCurrentUserDetails);

export default router;
