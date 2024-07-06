import { Router } from "express";

const router = Router();

// IMPORT JWT CONTROLLER
import * as jwtCtrl from "../middlewares/authJwt.js";

// IMPORT POSITION CONTROLLER
import * as positionCtrl from "../controllers/position.controller.js";

router.post('/position', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], positionCtrl.createPosition) // CREATE NEW POSITION

router.get("/position", jwtCtrl.verifyToken, positionCtrl.getPositions) // GET ALL POSITION

router.get("/position/:id", jwtCtrl.verifyToken, positionCtrl.getPositionById) // GET A ONE POSITION

router.put('/position/:id', [jwtCtrl.verifyToken, jwtCtrl.isModerator], positionCtrl.updatePosition) // UPDATE A POSITION

router.put('/position/:id/status', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], positionCtrl.changeStatusPosition) // CHANGE STATUS

router.delete('/position/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], positionCtrl.deletePosition) // DELETE A POSITION

export default router;
