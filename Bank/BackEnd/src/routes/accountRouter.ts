import { Router } from "express";
import {
  createNewAccout,
  getCurrentUserAccounts,
} from "../controllers/accountController.js";

const router = Router();

// get all accounts in the bank (admin only) {filter by optional parameters}
router.get("/admin", () => {});

// get users stats (admin only)
router.get("/admin/stats", () => {});

// get current user accounts
// @ts-ignore
router.get("/", getCurrentUserAccounts);

// get specific account for the current user
router.get("/:number", () => {});

// create new account for the current user
// @ts-ignore
router.post("/", createNewAccout);

// delete a specific account for the current user
router.delete("/:number", () => {});

export default router;
