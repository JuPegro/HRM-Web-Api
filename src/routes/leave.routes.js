import { Router } from "express";

const router = Router();

// IMPORT JWT CONTROLLER
import * as jwtCtrl from "../middlewares/authJwt.js";

// IMPORT LEAVE CONTROLLER
import * as leaveCtrl from "../controllers/leave.controller.js";

/**
 * @swagger
 * /api/leave:
 *   post:
 *     summary: Create a new leave
 *     tags:
 *       - Leave
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
 *         description: Successfully created leave
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Leave'
 *       400:
 *         description: Leave name already in use
 *       500:
 *         description: Internal server error 
 * 
 */

router.post('/leave', [jwtCtrl.verifyToken, jwtCtrl.isModerator], leaveCtrl.createLeave) // CREATE NEW LEAVE

/**
 * @swagger
 * /api/leave:
 *   get:
 *     summary: Get all leave
 *     tags:
 *       - Leave
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully all leaves
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Leave'
 *       400:
 *         description: Leaves not found!
 *       500:
 *         description: Internal server error 
 * 
 */

router.get("/leave", jwtCtrl.verifyToken, leaveCtrl.getLeaves) // GET ALL LEAVE

/**
 * @swagger
 * /api/leave/{id}:
 *   get:
 *     summary: Get leave by id
 *     tags:
 *       - Leave
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the leave to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully leave found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Leave'
 *       400:
 *         description: Leave not found!
 *       500:
 *         description: Internal server error 
 * 
 */

router.get("/leave/:id", jwtCtrl.verifyToken, leaveCtrl.getLeavesById) // GET A ONE LEAVE

/**
 * @swagger
 * /api/leave/{id}:
 *   put:
 *     summary: Update a leave
 *     tags:
 *       - Leave
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the leave to get
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
 *               $ref: '#/components/schemas/Leave'
 *       400:
 *         description: Leave or code already in use!
 *       500:
 *         description: Internal server error 
 * 
 */

router.put('/leave/:id', [jwtCtrl.verifyToken, jwtCtrl.isModerator], leaveCtrl.updateLeave) // UPDATE A LEAVE

/**
 * @swagger
 * /api/leave/{id}/status:
 *   put:
 *     summary: Change status leave
 *     tags:
 *       - Leave
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the leave to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully status changed
 *       400:
 *         description: Leave not found!
 *       500:
 *         description: Internal server error 
 * 
 */

router.put('/leave/:id/status', [jwtCtrl.verifyToken], jwtCtrl.isAdmin, leaveCtrl.changeStatusLeave) // CHANGE STATUS

/**
 * @swagger
 * /api/leave/{id}:
 *   delete:
 *     summary: Delete a leave
 *     tags:
 *       - Leave
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the leave to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully deleted leave
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error 
 * 
 */

router.delete('/leave/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], leaveCtrl.deleteLeave) // DELETE A LEAVE

export default router;
