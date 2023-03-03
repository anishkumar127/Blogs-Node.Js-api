import userModel from "../model/user";
import bcrypt from "bcryptjs";
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await userModel.find();
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No User Found!" });
  }
  return res.status(200).json({ users });
};

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await userModel.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already Exits! Login Instead" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new userModel({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });
  let savedUser;
  try {
    savedUser = await user.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ savedUser });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await userModel.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Couldn't find User by this Email!" });
  }
  const isValidPassword = bcrypt.compareSync(password, existingUser.password);
  if (!isValidPassword) {
    return res.status(400).json({ message: "Password not valid!" });
  }
  return res.status(200).json({ message: "Login Success!" });
};
