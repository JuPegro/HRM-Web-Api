import { Router } from "express";

const router = Router();

// IMPORT JWT CONTROLLER
import * as jwtCtrl from "../middlewares/authJwt.js";

// IMPORT REVIEWER CONTROLLER
import * as reviewerCtrl from "../controllers/reviewer.controller.js";

router.post('/reviewer', [jwtCtrl.verifyToken, jwtCtrl.isModerator], reviewerCtrl.createReviewer) // CREATE NEW REVIEWER

router.get("/reviewer", jwtCtrl.verifyToken, reviewerCtrl.getReviewers) // GET ALL REVIEWER

router.get("/reviewer/:id", jwtCtrl.verifyToken, reviewerCtrl.getReviewerById) // GET A ONE REVIEWER

router.put('/reviewer/:id', [jwtCtrl.verifyToken, jwtCtrl.isModerator], reviewerCtrl.updateReviewer) // UPDATE A REVIEWER

router.put('/reviewer/:id/status', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], reviewerCtrl.changeStatusReviewer) // CHANGE STATUS

router.delete('/reviewer/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], reviewerCtrl.deleteReviewer) // DELETE A REVIEWER

export default router;
