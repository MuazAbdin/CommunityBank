import { Router } from "express";
import {
  createTransaction,
  getAllTransactions,
} from "../controllers/transactionsController.js";
import { validateTransferInput } from "../middlewares/validationMiddleware.js";

const router = Router();

// Retrieving transactions in the current account (optional parametes for filter result).
router.get("/", getAllTransactions);

// Adding a transaction to the current account.
//@ts-ignore
router.post("/", validateTransferInput, createTransaction);

// Getting stats of the account's transactions.
router.get("/stats", () => {});

export default router;
