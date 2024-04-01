import { Router } from "express";
import { createLoan } from "../controllers/loanController.js";

const router = Router();

// Retrieving all loans (optional parametes for filter result). admin
router.get("/", () => {});

// Adding a transaction to the current account.
//@ts-ignore
router.post("/:number", createLoan);

export default router;
