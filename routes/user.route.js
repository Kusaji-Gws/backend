import express from "express";
import { login, updateProfile ,register,logout} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewears/isAuthenticated.js";

const router=express.Router()
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile/update").post(isAuthenticated,updateProfile);

export default router;