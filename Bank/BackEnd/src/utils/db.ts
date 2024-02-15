import mongoose from "mongoose";

export default function connectDB() {
  const url = `${process.env.MONGO_URL}`;
  // const url = "mongodb://127.0.0.1:27017/ExtendedBankDB";

  try {
    mongoose.connect(url);
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }

  mongoose.connection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });

  mongoose.connection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });

  return;
}
