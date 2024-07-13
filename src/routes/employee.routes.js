import {Router} from 'express'

const router = Router();

// IMPORT JWT CONTROLLER
import * as jwtCtrl from "../middlewares/authJwt.js";

// IMPORT EMPLOYEE CONTROLLER
import * as employeeCtrl from "../controllers/employee.controller.js";

/**
 * @swagger
 * /api/employee:
 *   post:
 *     summary: Create a new employee
 *     tags:
 *       - Employee
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastname
 *               - positionId
 *               - salary
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               positionId:
 *                 type: string
 *                 example: 808b14a8-7836-49f9-a89c-eb20e833f373
 *               salary:
 *                 type: string
 *                 example: 108256.32
 *     responses:
 *       201:
 *         description: Successfully created employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Employee or Code already in use
 *       500:
 *         description: Internal server error 
 * 
 */

router.post('/employee', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], employeeCtrl.createEmployee) // CREATE NEW EMPLOYEE

/**
 * @swagger
 * /api/employee:
 *   get:
 *     summary: Get all employees
 *     tags:
 *       - Employee
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully all employees
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: employees not found!
 *       500:
 *         description: Internal server error 
 * 
 */

router.get("/employee", jwtCtrl.verifyToken, employeeCtrl.getEmployees) // GET ALL EMPLOYEE

/**
 * @swagger
 * /api/employee/{id}:
 *   get:
 *     summary: Get employee by id
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the employee to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully employee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Employee not found!
 *       500:
 *         description: Internal server error 
 * 
 */

router.get("/employee/:id", jwtCtrl.verifyToken, employeeCtrl.getEmployeeById) // GET A ONE EMPLOYEE

/**
 * @swagger
 * /api/employee/{id}:
 *   put:
 *     summary: Update a employee
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the employee to get
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastname
 *               - positionId
 *               - salary
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               positionId:
 *                 type: string
 *                 example: 808b14a8-7836-49f9-a89c-eb20e833f373
 *               salary:
 *                 type: string
 *                 example: 108256.32
 *     responses:
 *       200:
 *         description: Successfully update
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Employee or code already in use!
 *       500:
 *         description: Internal server error 
 * 
 */

router.put('/employee/:id', [jwtCtrl.verifyToken], employeeCtrl.updateEmployee) // UPDATE A EMPLOYEE

/**
 * @swagger
 * /api/employee/{id}/status:
 *   put:
 *     summary: Change status employee
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the employee to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully status changed
 *       400:
 *         description: Employee not found!
 *       500:
 *         description: Internal server error 
 * 
 */

router.put('/employee/:id/status', [jwtCtrl.verifyToken], employeeCtrl.changeStatusEmployee) // CHANGE STATUS

/**
 * @swagger
 * /api/employee/{id}:
 *   delete:
 *     summary: Delete a employee
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the employee to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully deleted employee
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error 
 * 
 */

router.delete('/employee/:id', [jwtCtrl.verifyToken], employeeCtrl.deleteEmployee) // DELETE A EMPLOYEE

export default router;