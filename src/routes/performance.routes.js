import { Router } from "express";

const router = Router();

// IMPORT JWT CONTROLLER
import * as jwtCtrl from "../middlewares/authJwt.js";

// IMPORT PERFORMANCE CONTROLLER
import * as performanceCtrl from "../controllers/performance.controller.js";

router.post('/performance', [jwtCtrl.verifyToken, jwtCtrl.isModerator], performanceCtrl.createPerformance) // CREATE A NEW PERFORMANCE
router.get('/performance', [jwtCtrl.verifyToken], performanceCtrl.getPerformances) // GET ALL PERFORMANCE
router.get('/performance/:id', [jwtCtrl.verifyToken], performanceCtrl.getPerformanceById) // GET ONE PERFORMANCE BY ID
router.put('/performance/:id', [jwtCtrl.verifyToken, jwtCtrl.isModerator], performanceCtrl.updatePeformance) // UPDATE PERFORMANCE
router.put('/performance/:id/status', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], performanceCtrl.changeStatusPerformance) // CHANGE STATUS
router.delete('/performance/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], performanceCtrl.deletePerformance) // DELETE PERFORMANCE

export default router;
