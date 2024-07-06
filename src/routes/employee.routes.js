import {Router} from 'express'

const router = Router();

// IMPORT JWT CONTROLLER
import * as jwtCtrl from "../middlewares/authJwt.js";

// IMPORT EMPLOYEE CONTROLLER
import * as employeeCtrl from "../controllers/employee.controller.js";


router.post('/employee', [jwtCtrl.verifyToken, jwtCtrl.isModerator], employeeCtrl.createEmployee) // CREATE NEW EMPLOYEE

router.get("/employee", jwtCtrl.verifyToken, employeeCtrl.getEmployees) // GET ALL EMPLOYEE

router.get("/employee/:id", jwtCtrl.verifyToken, employeeCtrl.getEmployeeById) // GET A ONE EMPLOYEE

router.put('/employee/:id', [jwtCtrl.verifyToken, jwtCtrl.isModerator], employeeCtrl.updateEmployee) // UPDATE A EMPLOYEE

router.put('/employee/:id/status', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], employeeCtrl.changeStatusEmployee) // CHANGE STATUS

router.delete('/employee/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], employeeCtrl.deleteEmployee) // DELETE A EMPLOYEE

export default router;