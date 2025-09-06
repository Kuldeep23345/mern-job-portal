import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router = Router();

router.route("/apply/:id").get(verifyJWT,applyJob);
router.route("/get").get(verifyJWT,getAppliedJobs);
router.route("/:id/applicants").get(verifyJWT, getApplicants);
router.route("/status/:id/update").post(verifyJWT, updateStatus);

export default router