import {Router} from 'express'

const router = Router();

// IMPORT JWT CONTROLLER
import * as jwtCtrl from "../middlewares/authJwt.js";

// IMPORT DEPARTMENT CONTROLLER
import * as DepartmentCtrl from "../controllers/department.controller.js";

/**
 * @swagger
 * /api/department:
 *   post:
 *     summary: Create a new department
 *     tags:
 *       - Department
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
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *                 example: Information technology
 *               code:
 *                 type: string
 *                 example: TI00034
 *     responses:
 *       200:
 *         description: Successfully created department
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *       400:
 *         description: Department or Code already in use
 *       500:
 *         description: Internal server error 
 * 
 */

router.post('/department', [jwtCtrl.verifyToken, jwtCtrl.isModerator], DepartmentCtrl.createDepartment) // CREATE NEW DEPARTMENT

/**
 * @swagger
 * /api/department:
 *   get:
 *     summary: Get all departments
 *     tags:
 *       - Department
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully all departments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *       400:
 *         description: Departments not found!
 *       500:
 *         description: Internal server error 
 * 
 */

router.get("/department", jwtCtrl.verifyToken, DepartmentCtrl.getDepartments) // GET ALL DEPARTMENT

/**
 * @swagger
 * /api/department/{id}:
 *   get:
 *     summary: Get department by id
 *     tags:
 *       - Department
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the department to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully department found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *       400:
 *         description: Department not found!
 *       500:
 *         description: Internal server error 
 * 
 */

router.get("/department/:id", jwtCtrl.verifyToken, DepartmentCtrl.getDepartmentById) // GET A ONE DEPARTMENT

/**
 * @swagger
 * /api/department/{id}:
 *   put:
 *     summary: Update a department
 *     tags:
 *       - Department
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the department to get
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
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *                 example: Information technology
 *               code:
 *                 type: string
 *                 example: TI00034
 *     responses:
 *       200:
 *         description: Successfully update
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *       400:
 *         description: Department or code already in use!
 *       500:
 *         description: Internal server error 
 * 
 */

router.put('/department/:id', [jwtCtrl.verifyToken, jwtCtrl.isModerator], DepartmentCtrl.updateDepartment) // UPDATE A DEPARTMENT

/**
 * @swagger
 * /api/department/{id}/status:
 *   put:
 *     summary: Change status department
 *     tags:
 *       - Department
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the department to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully status changed
 *       400:
 *         description: Department not found!
 *       500:
 *         description: Internal server error 
 * 
 */

router.put('/department/:id/status', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], DepartmentCtrl.changeStatusDepartment) // CHANGE STATUS

/**
 * @swagger
 * /api/department/{id}:
 *   delete:
 *     summary: Delete a department
 *     tags:
 *       - Department
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the department to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully deleted department
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error 
 * 
 */

router.delete('/department/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], DepartmentCtrl.deleteDepartment) // DELETE A DEPARTMENT

export default router;