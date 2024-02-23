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

// {
//   "IDcard": "000222444",
//   "firstName": "Muaz",
//   "lastName": "Abdin",
//   "password": "Com$24",
//   "passwordConfirm": "Com$24",
//   "email": "muathabd@gmail.com",
//   "mobile": "0587741171",
//   "city": "Jerusalem",
//   "street": "Main st."
// }
