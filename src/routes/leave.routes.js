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
 *               - employeeId
 *               - startDate
 *               - endDate
 *               - reason
 *             properties:
 *               employeeId:
 *                 type: string
 *                 example: 31da9deb-e098-45be-8c9a-42d6704f81fc
 *               startDate:
 *                 type: string
 *                 example: 2024-07-10
 *               endDate:
 *                 type: string
 *                 example: 2024-07-11
 *               reason:
 *                 type: string
 *                 example: I will take my vacation
 *     responses:
 *       201:
 *         description: Successfully created leave
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Leave'
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

router.post("/leave", jwtCtrl.verifyToken,  leaveCtrl.createLeave); // CREATE NEW LEAVE

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
 *         description: Successfully get all leaves
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Leave'
 *             example:
 *               leaves:
 *                  - id: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
 *                    employeeId: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe"
 *                    startDate: "2024-07-10"
 *                    endDate: "2024-07-11"
 *                    reason: "vacation"
 *                    status: "ACTIVE"
 *                    createdAt: "2024-07-05T00:42:17.715Z"
 *                    updatedAt: "2024-07-05T00:42:17.715Z"
 *                  - id: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
 *                    employeeId: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe"
 *                    startDate: "2024-07-10"
 *                    endDate: "2024-07-11"
 *                    reason: "vacation"
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

router.get("/leave", jwtCtrl.verifyToken, leaveCtrl.getLeaves); // GET ALL LEAVE

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
 *         description: Successfully get leave
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Leave'
 *             example:
 *               leave:
 *                  - id: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
 *                    employeeId: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe"
 *                    startDate: "2024-07-10"
 *                    endDate: "2024-07-11"
 *                    reason: "vacation"
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

router.get("/leave/:id", jwtCtrl.verifyToken, leaveCtrl.getLeavesById); // GET A ONE LEAVE

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
 *               - employeeId
 *               - startDate
 *               - endDate
 *               - reason
 *             properties:
 *               employeeId:
 *                 type: string
 *                 example: 31da9deb-e098-45be-8c9a-42d6704f81fc
 *               startDate:
 *                 type: string
 *                 example: 2024-07-10
 *               endDate:
 *                 type: string
 *                 example: 2024-07-11
 *               reason:
 *                 type: string
 *                 example: I will take my vacation
 *     responses:
 *       200:
 *         description: Successfully update leave
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Leave'
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

router.put("/leave/:id", jwtCtrl.verifyToken, leaveCtrl.updateLeave); // UPDATE A LEAVE

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
 *         description: ID of the leave to update
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: PENDING
 *     responses:
 *       200:
 *         description: Successfully change status leave
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Status change to PENDING
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
 */


router.put("/leave/:id/status", [jwtCtrl.verifyToken, jwtCtrl.isAdmin], leaveCtrl.changeStatusLeave); // CHANGE STATUS

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Successfully deleted leave
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

router.delete("/leave/:id", [jwtCtrl.verifyToken, jwtCtrl.isAdmin], leaveCtrl.deleteLeave); // DELETE A LEAVE

export default router;
