import { Router } from "express";
const router = Router();

//  IMPORT USER CONTROLLER
import * as userCtrl from "../controllers/user.controller.js";

router.get("/user", userCtrl.getUsers); // GET ALL USERS
router.get("/user/:id", userCtrl.getUserById); // GET AN USERS
router.post("/user", userCtrl.createUser); // CREATE NEW USER
router.put("/user/:id", userCtrl.updateUser); // UPDATE AN USER
router.put("/user/:id", userCtrl.changeStatusUser); // CHANGE STATUS OF USER
router.delete("/user/:id", userCtrl.deleteUser); // DELETE AN USER

export default router;
