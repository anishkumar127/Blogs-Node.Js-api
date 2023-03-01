import express from "express";
const router = express.Router();
import { getAllUsers, signUp } from "../controller/user-controller";
router.get("/", getAllUsers);
router.post("/signup", signUp);

export default router;
