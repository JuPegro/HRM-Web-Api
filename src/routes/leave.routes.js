import { Router } from "express";

const router = Router();

// IMPORT JWT CONTROLLER
import * as jwtCtrl from "../middlewares/authJwt.js";

// IMPORT LEAVE CONTROLLER
import * as leaveCtrl from "../controllers/leave.controller.js";


router.post('/leave', [jwtCtrl.verifyToken, jwtCtrl.isModerator], leaveCtrl.createLeave) // CREATE NEW LEAVE

router.get("/leave", jwtCtrl.verifyToken, leaveCtrl.getLeaves) // GET ALL LEAVE

router.get("/leave/:id", jwtCtrl.verifyToken, leaveCtrl.getLeavesById) // GET A ONE LEAVE

router.put('/leave/:id', [jwtCtrl.verifyToken, jwtCtrl.isModerator], leaveCtrl.updateLeave) // UPDATE A LEAVE

router.put('/leave/:id/status', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], leaveCtrl.changeStatusLeave) // CHANGE STATUS

router.delete('/leave/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], leaveCtrl.deleteLeave) // DELETE A LEAVE

export default router;
