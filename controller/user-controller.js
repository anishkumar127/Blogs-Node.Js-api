import userModel from "../model/user";
const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await userModel.find();
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "Internal Server Error!" });
  }
  return res.status(200).json({ users });
};
