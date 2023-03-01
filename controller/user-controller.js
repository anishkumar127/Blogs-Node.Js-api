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
  });
  let savedUser;
  try {
    savedUser = await user.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ savedUser });
};
