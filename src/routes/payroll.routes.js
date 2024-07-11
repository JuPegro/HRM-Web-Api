import { Router } from "express";

const router = Router();

// IMPORT JWT CONTROLLER
import * as jwtCtrl from "../middlewares/authJwt.js";

// IMPORT LICENSE CONTROLLER
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
 *               - name
 *               - description
 *               - departmentId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Information technology
 *               description:
 *                 type: string
 *                 example: an advice service provided by a computer company
 *               departmentId:
 *                 type: string
 *                 example: e97bfbe8-c334-495a-8edf-91d5cf47d5fe
 *     responses:
 *       200:
 *         description: Successfully created payroll
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payroll'
 *       400:
 *         description: Payroll name already in use
 *       500:
 *         description: Internal server error 
 * 
 */

router.post('/payroll', [jwtCtrl.verifyToken, jwtCtrl.isModerator], payrollCtrl.createPayroll) // CREATE NEW PAYROLL

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
 *         description: Successfully all payrolls
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payroll'
 *       400:
 *         description: PayrollS not found!
 *       500:
 *         description: Internal server error 
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
 *         description: Successfully payroll found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payroll'
 *       400:
 *         description: payroll not found!
 *       500:
 *         description: Internal server error 
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
 *               - name
 *               - description
 *               - departmentId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Information technology
 *               description:
 *                 type: string
 *                 example: an advice service provided by a computer company
 *               departmentId:
 *                 type: string
 *                 example: e97bfbe8-c334-495a-8edf-91d5cf47d5fe
 *     responses:
 *       200:
 *         description: Successfully update
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payroll'
 *       400:
 *         description: Payroll or code already in use!
 *       500:
 *         description: Internal server error 
 * 
 */

router.put('/payroll/:id', [jwtCtrl.verifyToken, jwtCtrl.isModerator], payrollCtrl.updatePayroll) // UPDATE A PAYROLL

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
 *         description: Successfully status changed
 *       400:
 *         description: Payroll not found!
 *       500:
 *         description: Internal server error 
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
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error 
 * 
 */

router.delete('/payroll/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], payrollCtrl.deletePayroll) // DELETE A PAYROLL

export default router;

