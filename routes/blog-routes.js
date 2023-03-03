import express from "express";
import {
  addBlogs,
  getAllBlogs,
  getById,
  removeBlogs,
  updateBlogs,
} from "../controller/blog-controller";
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlogs);
blogRouter.put("/update/:id", updateBlogs);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", removeBlogs);
export default blogRouter;
