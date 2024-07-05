import { Router } from "express";
const router = Router();

//  IMPORT USER CONTROLLER
import * as userCtrl from "../controllers/user.controller.js";

// IMPORT AUTHJWT
import * as jwtCtrl from "../middlewares/authJwt.js";

router.post("/user",[ jwtCtrl.verifyToken, jwtCtrl.isModerator ] ,userCtrl.createUser); // CREATE NEW USER
router.get("/user",jwtCtrl.verifyToken, userCtrl.getUsers); // GET ALL USERS
router.get("/user/:id",jwtCtrl.verifyToken, userCtrl.getUserById); // GET AN USERS
router.put("/user/:id",[ jwtCtrl.verifyToken, jwtCtrl.isModerator ], userCtrl.updateUser); // UPDATE AN USER
router.put("/user/:id/status",[ jwtCtrl.verifyToken, jwtCtrl.isAdmin ], userCtrl.changeStatusUser); // CHANGE STATUS OF USER
router.delete("/user/:id",[ jwtCtrl.verifyToken, jwtCtrl.isAdmin ], userCtrl.deleteUser); // DELETE AN USER

export default router;
