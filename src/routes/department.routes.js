import {Router} from 'express'

const router = Router();

// IMPORT JWT CONTROLLER
import * as jwtCtrl from "../middlewares/authJwt.js";

// IMPORT DEPARTMENT CONTROLLER
import * as DepartmentCtrl from "../controllers/department.controller.js";

router.get("/department", jwtCtrl.verifyToken, DepartmentCtrl.getDepartments) // GET ALL DEPARTMENT
router.get("/department/:id", jwtCtrl.verifyToken, DepartmentCtrl.getDepartmentById) // GET A ONE DEPARTMENT
router.post('/department', [jwtCtrl.verifyToken], DepartmentCtrl.createDepartment) // CREATE NEW DEPARTMENT
router.put('/department/:id', [jwtCtrl.verifyToken, jwtCtrl.isModerator], DepartmentCtrl.updateDepartment) // UPDATE A DEPARTMENT
router.put('/department/:id/status', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], DepartmentCtrl.changeStatusDepartment) // CHANGE STATUS
router.delete('/department/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], DepartmentCtrl.deleteDepartment) // DELETE A DEPARTMENT

export default router;