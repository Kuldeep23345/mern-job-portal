import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = Router();

router.route("/post").post(verifyJWT,postJob);
router.route("/get").get(verifyJWT,getAllJobs);
router.route("/get-admin-jobs").get(verifyJWT, getAdminJobs);
router.route("/get/:id").get(verifyJWT, getJobById);

export default router