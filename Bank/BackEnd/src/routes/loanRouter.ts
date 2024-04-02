import { Router } from "express";
import {
  createLoan,
  getAllLoans,
  scheduleLoan,
} from "../controllers/loanController.js";
import { validateLoanInput } from "../middlewares/validationMiddleware.js";

const router = Router();

// Retrieving all loans (optional parametes for filter result). admin
router.get("/", () => {});

// Retrieving all loans for aspecific account for the current user.
router.get("/:number", getAllLoans);

// calculate amortized shedule.
//@ts-ignore
router.post("/calculate", validateLoanInput, scheduleLoan);

// Adding a loan to a aspecific account for the current user.
//@ts-ignore
router.post("/:number", validateLoanInput, createLoan);

export default router;
