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
 *         description: Successfully created performance
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Performance'
 *       400:
 *         description: Performance name already in use
 *       500:
 *         description: Internal server error 
 * 
 */

router.post('/performance', [jwtCtrl.verifyToken, jwtCtrl.isModerator], performanceCtrl.createPerformance) // CREATE A NEW PERFORMANCE

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
 *         description: Successfully all performances
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Performance'
 *       400:
 *         description: Performances not found!
 *       500:
 *         description: Internal server error 
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
 *         description: Successfully performance found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Performance'
 *       400:
 *         description: performance not found!
 *       500:
 *         description: Internal server error 
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
 *               $ref: '#/components/schemas/Performance'
 *       400:
 *         description: Performance or code already in use!
 *       500:
 *         description: Internal server error 
 * 
 */

router.put('/performance/:id', [jwtCtrl.verifyToken, jwtCtrl.isModerator], performanceCtrl.updatePeformance) // UPDATE PERFORMANCE

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
 *         description: Successfully status changed
 *       400:
 *         description: Performance not found!
 *       500:
 *         description: Internal server error 
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
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error 
 * 
 */

router.delete('/performance/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], performanceCtrl.deletePerformance) // DELETE PERFORMANCE

export default router;
