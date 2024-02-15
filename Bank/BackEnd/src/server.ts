import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
const app = express();
import morgan from "morgan";
import connectDB from "./utils/db.js";

// routers
// import transactionRouter from "./routes/transactionRouter.js";
// import userRouter from "./routes/userRouter.js";
// import accountRouter from "./routes/accountRouter.js";
// import authRouter from "./routes/authRouter.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connectDB();

// app.use("/v1/transactions", transactionRouter);
// app.use("/v1/accounts", accountRouter);
// app.use("/v1/users", userRouter);
// app.use("/v1/auth", authRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  // @ts-ignore
  const statusCode = err.statusCode || 500;
  const msg = err.message || "something went wrong, try again later";
  res.status(statusCode).send({ msg });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT} ... <http://localhost:${PORT}/>`);
});
