import mongoose from "mongoose";
const SCHEMA = mongoose.Schema;

const userSchema = new SCHEMA({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "BlogModel", required: true }],
});

export default mongoose.model("Blog", userSchema);
