import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected!."))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`server running at port ${PORT}`));
