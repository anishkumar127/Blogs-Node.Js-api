import express from "express";
const router = express.Router();
import { getAllUsers, login, signUp } from "../controller/user-controller";
router.get("/", getAllUsers);
router.post("/signup", signUp);
router.post("/login", login);

export default router;
