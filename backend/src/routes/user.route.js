import { Router } from "express";
import {
  userLogin,
  userLogout,
  userRegister,
  userUpdateProfile,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(upload.single("profile"), userRegister);
router.route("/login").post(userLogin);
router.route("/logout").get(verifyJWT, userLogout);
router
  .route("/profile-update")
  .post(verifyJWT, upload.single("resume"), userUpdateProfile);

export default router;
