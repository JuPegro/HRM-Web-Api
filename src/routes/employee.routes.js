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
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       403:
 *         description: No token provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forbidden'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServer'
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
 *         description: Successfully get all Employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Employee'
 *             example:
 *               employees:
 *                  - id: 90acb06b-3dea-4483-b106-e85f30a2b986
 *                    name: John
 *                    lastname: Doe
 *                    positionId: e97bfbe8-c334-495a-8edf-91d5cf47d5fe
 *                    salary: "108002.23"
 *                    status: ACTIVE
 *                    createdAt: "2024-07-05T00:42:17.715Z"
 *                    updatedAt: "2024-07-05T00:42:17.715Z"
 *                  - id: 90acb06b-3dea-4483-b106-e85f30a2b986
 *                    name: JuPegro
 *                    lastname: Developer
 *                    positionId: e97bfbe8-c334-495a-8edf-91d5cf47d5fe
 *                    salary: "108002.23"
 *                    status: INACTIVE
 *                    createdAt: "2024-07-05T00:42:17.715Z"
 *                    updatedAt: "2024-07-05T00:42:17.715Z"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       403:
 *         description: No token provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forbidden'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServer'
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
 *         description: Successfully get employee
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Employee'
*             example:
 *               employee:
 *                  - id: 90acb06b-3dea-4483-b106-e85f30a2b986
 *                    name: JuPegro
 *                    lastname: Developer
 *                    positionId: e97bfbe8-c334-495a-8edf-91d5cf47d5fe
 *                    salary: "108002.23"
 *                    status: INACTIVE
 *                    createdAt: "2024-07-05T00:42:17.715Z"
 *                    updatedAt: "2024-07-05T00:42:17.715Z"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       403:
 *         description: No token provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forbidden'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServer'
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
 *         description: Successfully update employee
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       403:
 *         description: No token provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forbidden'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServer'
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
 *         description: Successfully change status employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Status change to 'ACTIVE'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       403:
 *         description: No token provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forbidden'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServer'
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Successfully deleted employee
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       403:
 *         description: No token provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forbidden'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServer'
 * 
 */

router.delete('/employee/:id', [jwtCtrl.verifyToken], employeeCtrl.deleteEmployee) // DELETE A EMPLOYEE

export default router;