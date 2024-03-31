import { Router } from "express";
import {
  createTransaction,
  getAllTransactions,
  getTransactionsPDF,
} from "../controllers/transactionsController.js";
import { validateTransferInput } from "../middlewares/validationMiddleware.js";

const router = Router();

// Retrieving transactions in the current account (optional parametes for filter result).
router.get("/", getAllTransactions);

router.get("/pdf", getTransactionsPDF);

// Adding a transaction to the current account.
//@ts-ignore
router.post("/", validateTransferInput, createTransaction);

// Getting stats of the account's transactions.
router.get("/stats", () => {});

export default router;
