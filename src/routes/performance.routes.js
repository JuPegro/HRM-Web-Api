import { Router } from "express";

const router = Router();

// IMPORT JWT CONTROLLER
import * as jwtCtrl from "../middlewares/authJwt.js";

// IMPORT PERFORMANCE CONTROLLER
import * as performanceCtrl from "../controllers/performance.controller.js";

/**
 * @swagger
 * /api/performance:
 *   post:
 *     summary: Create a new performance
 *     tags:
 *       - Performance
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
 *               - reviewerId
 *               - score
 *               - comments
 *               - date
 *             properties:
 *               employeeId:
 *                 type: string
 *                 example: 4ac6b8c5-c0d6-46cb-824c-85308635e9df
 *               reviewerId:
 *                 type: string
 *                 example: 46842b99-8f25-498e-bd43-69ae48d3f24a
 *               score:
 *                 type: string
 *                 example: FOUR
 *               comments:
 *                 type: string
 *                 example: Really good employee
 *               date:
 *                 type: string
 *                 example: 2024-07-10
 *     responses:
 *       201:
 *         description: Successfully created performance
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Performance'
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

router.post('/performance', jwtCtrl.verifyToken, performanceCtrl.createPerformance) // CREATE A NEW PERFORMANCE

/**
 * @swagger
 * /api/performance:
 *   get:
 *     summary: Get all performance
 *     tags:
 *       - Performance
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully get all performances
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Performance'
 *             example:
 *               performances:
 *                  - id: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
 *                    employeeId: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe"
 *                    reviewerId: "46842b99-8f25-498e-bd43-69ae48d3f24a"
 *                    score: "FIVE"
 *                    date: "2024-07-10"
 *                    comments: "Really good employee"
 *                    status: "INACTIVE"
 *                    createdAt: "2024-07-05T00:42:17.715Z"
 *                    updatedAt: "2024-07-05T00:42:17.715Z"
 *                  - id: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
 *                    employeeId: "46842b99-8f25-498e-bd43-69ae48d3f24a"
 *                    reviewerId: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe"
 *                    score: "ONE"
 *                    date: "2024-07-10"
 *                    comments: "Really bad employee"
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

router.get('/performance', [jwtCtrl.verifyToken], performanceCtrl.getPerformances) // GET ALL PERFORMANCE

/**
 * @swagger
 * /api/performance/{id}:
 *   get:
 *     summary: Get performance by id
 *     tags:
 *       - Performance
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the performance to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully get performance
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Performance'
 *             example:
 *               performance:
 *                  - id: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
 *                    employeeId: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe"
 *                    reviewerId: "46842b99-8f25-498e-bd43-69ae48d3f24a"
 *                    score: "FIVE"
 *                    date: "2024-07-10"
 *                    comments: "Really good employee"
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

router.get('/performance/:id', [jwtCtrl.verifyToken], performanceCtrl.getPerformanceById) // GET ONE PERFORMANCE BY ID

/**
 * @swagger
 * /api/performance/{id}:
 *   put:
 *     summary: Update a performance
 *     tags:
 *       - Performance
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the performance to get
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
 *               - reviewerId
 *               - score
 *               - comments
 *               - date
 *             properties:
 *               employeeId:
 *                 type: string
 *                 example: 4ac6b8c5-c0d6-46cb-824c-85308635e9df
 *               reviewerId:
 *                 type: string
 *                 example: 46842b99-8f25-498e-bd43-69ae48d3f24a
 *               score:
 *                 type: string
 *                 example: FOUR
 *               comments:
 *                 type: string
 *                 example: Really good employee
 *               date:
 *                 type: string
 *                 example: 2024-07-10
 *     responses:
 *       200:
 *         description: Successfully update performance
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Performance'
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

router.put('/performance/:id', jwtCtrl.verifyToken, performanceCtrl.updatePeformance) // UPDATE PERFORMANCE

/**
 * @swagger
 * /api/performance/{id}/status:
 *   put:
 *     summary: Change status performance
 *     tags:
 *       - Performance
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the performance to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully change status performance
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

router.put('/performance/:id/status', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], performanceCtrl.changeStatusPerformance) // CHANGE STATUS

/**
 * @swagger
 * /api/performance/{id}:
 *   delete:
 *     summary: Delete a performance
 *     tags:
 *       - Performance
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the performance to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully deleted performance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Successfully deleted performance
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

router.delete('/performance/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], performanceCtrl.deletePerformance) // DELETE PERFORMANCE

export default router;
