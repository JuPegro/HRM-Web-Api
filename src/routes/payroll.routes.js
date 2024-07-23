import { Router } from "express";

const router = Router();

// IMPORT JWT CONTROLLER
import * as jwtCtrl from "../middlewares/authJwt.js";

// IMPORT PAYROLL CONTROLLER
import * as payrollCtrl from "../controllers/payroll.controller.js";


/**
 * @swagger
 * /api/payroll:
 *   post:
 *     summary: Create a new payroll
 *     tags:
 *       - Payroll
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeeId
 *               - date
 *             properties:
 *               employeeId:
 *                 type: string
 *                 example: 31da9deb-e098-45be-8c9a-42d6704f81fc
 *               date:
 *                 type: string
 *                 example: 2024-07-10
 *     responses:
 *       201:
 *         description: Successfully created payroll
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payroll'
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

router.post('/payroll', jwtCtrl.verifyToken, payrollCtrl.createPayroll) // CREATE NEW PAYROLL

/**
 * @swagger
 * /api/payroll:
 *   get:
 *     summary: Get all payroll
 *     tags:
 *       - Payroll
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully get all payrolls
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Payroll'
 *             example:
 *               payrolls:
 *                  - id: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
 *                    employeeId: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe"
 *                    date: "2024-07-10"
 *                    amount: "24990.78"
 *                    status: "INACTIVE"
 *                    createdAt: "2024-07-05T00:42:17.715Z"
 *                    updatedAt: "2024-07-05T00:42:17.715Z"
 *                  - id: "b2223jh1-1b75-452e-aa5c-f45f67b79iko"
 *                    employeeId: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe"
 *                    date: "2024-12-05"
 *                    amount: "38800.78"
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

router.get("/payroll", jwtCtrl.verifyToken, payrollCtrl.getPayrolls) // GET ALL PAYROLLS

/**
 * @swagger
 * /api/payroll/{id}:
 *   get:
 *     summary: Get payroll by id
 *     tags:
 *       - Payroll
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the payroll to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully get payroll
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Payroll'
 *             example:
 *               payroll:
 *                  - id: "b2223jh1-1b75-452e-aa5c-f45f67b79iko"
 *                    employeeId: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe"
 *                    date: "2024-12-05"
 *                    amount: "38800.78"
 *                    status: "ACTIVE"
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

router.get("/payroll/:id", jwtCtrl.verifyToken, payrollCtrl.getPayrollById) // GET A ONE PAYROLL

/**
 * @swagger
 * /api/payroll/{id}:
 *   put:
 *     summary: Update a payroll
 *     tags:
 *       - Payroll
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the payroll to get
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeeId
 *               - date
 *             properties:
 *               employeeId:
 *                 type: string
 *                 example: 31da9deb-e098-45be-8c9a-42d6704f81fc
 *               date:
 *                 type: string
 *                 example: 2024-07-10
 *     responses:
 *       200:
 *         description: Successfully update payroll
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Payroll'
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

router.put('/payroll/:id', jwtCtrl.verifyToken, payrollCtrl.updatePayroll) // UPDATE A PAYROLL

/**
 * @swagger
 * /api/payroll/{id}/status:
 *   put:
 *     summary: Change status payroll
 *     tags:
 *       - Payroll
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the payroll to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully change status payroll
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

router.put('/payroll/:id/status', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], payrollCtrl.changeStatusPayroll) // CHANGE STATUS


/**
 * @swagger
 * /api/payroll/{id}:
 *   delete:
 *     summary: Delete a payroll
 *     tags:
 *       - Payroll
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the payroll to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully deleted payroll
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Successfully deleted payroll
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

router.delete('/payroll/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], payrollCtrl.deletePayroll) // DELETE A PAYROLL

export default router;

