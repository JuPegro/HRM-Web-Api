import { Router } from "express";

const router = Router();

// IMPORT JWT CONTROLLER
import * as jwtCtrl from "../middlewares/authJwt.js";

// IMPORT LICENSE CONTROLLER
import * as licenseCtrl from "../controllers/license.controller.js";

router.post('/license', [jwtCtrl.verifyToken, jwtCtrl.isModerator], licenseCtrl.createLicense) // CREATE NEW LICENSE

router.get("/license", jwtCtrl.verifyToken, licenseCtrl.getLicense) // GET ALL LICENSE

router.get("/license/:id", jwtCtrl.verifyToken, licenseCtrl.getLicenseById) // GET A ONE LICENSE

router.put('/license/:id', [jwtCtrl.verifyToken, jwtCtrl.isModerator], licenseCtrl.updateLicense) // UPDATE A LICENSE

router.put('/license/:id/status', [jwtCtrl.verifyToken], jwtCtrl.isAdmin, licenseCtrl.changeStatusLicense) // CHANGE STATUS

router.delete('/license/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], licenseCtrl.deleteLicense) // DELETE A LICENSE

export default router;
