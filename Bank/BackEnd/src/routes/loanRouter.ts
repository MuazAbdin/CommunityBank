import { Router } from "express";
import { createLoan, scheduleLoan } from "../controllers/loanController.js";
import { validateLoanInput } from "../middlewares/validationMiddleware.js";

const router = Router();

// Retrieving all loans (optional parametes for filter result). admin
router.get("/", () => {});

// calculate amortized shedule.
//@ts-ignore
router.post("/calculate", validateLoanInput, scheduleLoan);

// Adding a loan to the current account.
//@ts-ignore
router.post("/:number", validateLoanInput, createLoan);

export default router;
