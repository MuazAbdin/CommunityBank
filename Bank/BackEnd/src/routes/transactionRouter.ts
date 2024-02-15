import { Router } from "express";

const router = Router();

// Retrieving transactions in the current account (optional parametes for filter result).
router.get("/", () => {});

// Adding a transaction to the current account.
router.post("/", () => {});

// Getting stats of the account's transactions.
router.get("/stats", () => {});

export default router;
