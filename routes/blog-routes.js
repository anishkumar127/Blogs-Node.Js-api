import express from "express";
import {
  addBlogs,
  getAllBlogs,
  updateBlogs,
} from "../controller/blog-controller";
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlogs);
blogRouter.put("/update/:id", updateBlogs);

export default blogRouter;
