import { Router } from "express";
import { createLoan, scheduleLoan } from "../controllers/loanController.js";

const router = Router();

// Retrieving all loans (optional parametes for filter result). admin
router.get("/", () => {});

// calculate amortized shedule.
router.post("/calculate", scheduleLoan);

// Adding a loan to the current account.
router.post("/:number", createLoan);

export default router;
