import mongoose from "mongoose";
import blogModel from "../model/Blog";
import userModel from "../model/user";
export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await blogModel.find();
  } catch (err) {
    console.log(err);
  }

  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found!" });
  }
  return res.status(200).json({ blogs });
};

export const addBlogs = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await userModel.findById(user);
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "NOT FOUND USER BY THIS ID!" });
  }

  const blog = new blogModel({
    title,
    description,
    image,
    user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(201).json({ blog });
};

export const updateBlogs = async (req, res, next) => {
  const { title, description } = req.body;
  const { id } = req.params;
  let blog;
  try {
    blog = await blogModel.findByIdAndUpdate(id, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update blogs" });
  }

  return res.status(200).json({ blog });
};

export const getById = async (req, res, next) => {
  const { id } = req.params;
  let blogs;
  try {
    blogs = await blogModel.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "Blogs not found!" });
  }
  return res.status(200).json({ blogs });
};

export const removeBlogs = async (req, res, next) => {
  const { id } = req.params;
  let blog;
  try {
    blog = await blogModel.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "Blogs not found!" });
  }
  return res.status(200).json({ message: "Deleted Successfully!", blog });
};

export const getByUserId = async (req, res, next) => {
  const { id } = req.params;
  let userBlogs;
  try {
    userBlogs = await userModel.findById(id).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No blogs found!" });
  }

  return res.status(200).json({ blogs: userBlogs });
};
