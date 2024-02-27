import { Router } from "express";

const router = Router();

// get all accounts in the bank (admin only) {filter by optional parameters}
router.get("/admin", () => {});

// get users stats (admin only)
router.get("/admin/stats", () => {});

// get current user accounts
router.get("/accounts", () => {});

// get current specific account
router.get("/accounts/:number", () => {});

// create new account for the current user
router.post("/accounts", () => {});

// delete a specific account for the current user
router.delete("/accounts/:number", () => {});

export default router;
