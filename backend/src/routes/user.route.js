import { Router } from "express";
import {
  userLogin,
  userLogout,
  userRegister,
  userUpdateProfile,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").post(verifyJWT, userLogout);
router.route("/profile-update").post(verifyJWT, userUpdateProfile);

export default router