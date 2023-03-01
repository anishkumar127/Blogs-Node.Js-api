import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());
// routes
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

// mongodb connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected!."))
  .catch((err) => console.log(err));

// server
app.listen(PORT, () => console.log(`server running at port ${PORT}`));
