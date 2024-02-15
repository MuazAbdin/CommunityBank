import { Router } from "express";

const router = Router();

// get the accounts (admin only) {filter by optional parameters}
router.get("/admin", () => {});

// get users stats (admin only)
router.get("/admin/stats", () => {});

// get current user
router.get("/current", () => {});

// get current user details
router.get("/current/details", () => {});

// edit current user details
router.patch("/current/details", () => {});

export default router;
