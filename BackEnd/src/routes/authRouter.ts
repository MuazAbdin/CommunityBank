import { Router } from "express";
import { login, logout, register } from "../controllers/authContoller.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middlewares/validationMiddleware.js";

const router = Router();

// @ts-ignore
router.post("/register", validateRegisterInput, register);
// @ts-ignore
router.post("/login", validateLoginInput, login);
// @ts-ignore
router.get("/logout", logout);

export default router;
