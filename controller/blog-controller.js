import blogModel from "../model/Blog";

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
  const blog = new blogModel({
    title,
    description,
    image,
    user,
  });

  try {
    await blog.save();
  } catch (err) {
    console.log(err);
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
