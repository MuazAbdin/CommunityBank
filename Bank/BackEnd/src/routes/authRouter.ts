import { Router } from "express";
import { login, logout, register } from "../controllers/authContoller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;

// {
//   "IDcard": "080456234",
//   "firstName": "Muaz",
//   "lastName": "Abdin",
//   "password": "elevation",
//   "email": "muathabd@gmail.com",
//   "mobile": "0587741171",
//   "city": "Jerusalem",
//   "street": "Main st."
// }
