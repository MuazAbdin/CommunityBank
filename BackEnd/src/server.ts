import * as dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request } from "express";
const app = express();
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";

// routers
import transactionRouter from "./routes/transactionRouter.js";
import userRouter from "./routes/userRouter.js";
import accountRouter from "./routes/accountRouter.js";
import loanRouter from "./routes/loanRouter.js";
import authRouter from "./routes/authRouter.js";
import contactRouter from "./routes/contactRouter.js";

// middleware
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";
import { getAccount } from "./middlewares/accountMiddleware.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// //@ts-ignore
// app.use("*", (req: Request, res: Response, next: NextFunction) => {
//   res.headers.set("Access-Control-Allow-Private-Network", "true"); // Set the private network header
//   next();
// });

app.use(
  cors({
    credentials: true, // important part here
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://muazabdin.github.io",
    ],
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connectDB();

app.use(
  "/api/v1/transactions/:number",
  authenticateUser,
  getAccount,
  transactionRouter
);
app.use("/api/v1/accounts", authenticateUser, accountRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/loans", authenticateUser, loanRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/contact", contactRouter);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
