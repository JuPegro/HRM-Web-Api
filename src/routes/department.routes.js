import { Router } from "express";

const router = Router();

// IMPORT JWT CONTROLLER
import * as jwtCtrl from "../middlewares/authJwt.js";

// IMPORT DEPARTMENT CONTROLLER
import * as departmentCtrl from "../controllers/department.controller.js";

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
 *                 example: TI000034
 *     responses:
 *       201:
 *         description: Successfully created department
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServer'
 *
 *
 */

router.post("/department",jwtCtrl.verifyToken,departmentCtrl.createDepartment); // CREATE NEW DEPARTMENT

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
 *         description: Successfully get all departments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Department'
 *             example:
 *               departments:
 *                  - id: "90acb06b-3dea-4483-b106-e85f30a2b986"
 *                    name: "RRHH"
 *                    code: "RH000001"
 *                    status: "INACTIVE"
 *                    createdAt: "2024-07-05T00:42:17.715Z"
 *                    updatedAt: "2024-07-05T00:42:17.715Z"
 *                  - id: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
 *                    name: "Information Technology"
 *                    code: "IT00034"
 *                    status: "ACTIVE"
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServer'
 *
 */

router.get("/department", jwtCtrl.verifyToken, departmentCtrl.getDepartments); // GET ALL DEPARTMENT

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
 *         description: Id of the department to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully get department
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Department'
*             example:
 *               department:
 *                  - id: "90acb06b-3dea-4483-b106-e85f30a2b986"
 *                    name: "RRHH"
 *                    code: "RH000001"
 *                    status: "INACTIVE"
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

router.get("/department/:id", jwtCtrl.verifyToken, departmentCtrl.getDepartmentById); // GET A ONE DEPARTMENT

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
 *                 example: TI000034
 *     responses:
 *       200:
 *         description: Successfully update department
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Department'
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

router.put("/department/:id", jwtCtrl.verifyToken, departmentCtrl.updateDepartment); // UPDATE A DEPARTMENT

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
 *         description: Successfully change status department
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Status change to 'ACTIVE'
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

router.put("/department/:id/status", [jwtCtrl.verifyToken, jwtCtrl.isAdmin], departmentCtrl.changeStatusDepartment); // CHANGE STATUS

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Successfully deleted department
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

router.delete("/department/:id", [jwtCtrl.verifyToken, jwtCtrl.isAdmin], departmentCtrl.deleteDepartment); // DELETE A DEPARTMENT

export default router;
