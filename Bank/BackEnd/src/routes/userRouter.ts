import { Router } from "express";
import { getCurrentUser } from "../controllers/userController.js";

const router = Router();

// get all users (admin only)
router.get("/admin", () => {});

// get users stats (admin only)
router.get("/admin/stats", () => {});

// get stats of user (admin only)
router.get("/admin/stats/:userID", () => {});

// get current user
router.get("/current", getCurrentUser);

// get current user details
router.get("/current/details", () => {});

// edit current user details
router.patch("/current/details", () => {});

export default router;
