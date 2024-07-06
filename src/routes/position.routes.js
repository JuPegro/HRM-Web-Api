import { Router } from "express";

const router = Router();

// IMPORT JWT CONTROLLER
import * as jwtCtrl from "../middlewares/authJwt.js";

// IMPORT POSITION CONTROLLER
import * as positionCtrl from "../controllers/position.controller.js";

/**
 * @swagger
 * /api/position:
 *   post:
 *     summary: Create a new position
 *     tags:
 *       - Position
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
 *         description: Successfully created position
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Position'
 *       400:
 *         description: Position name already in use
 *       500:
 *         description: Internal server error 
 * 
 */

router.post('/position', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], positionCtrl.createPosition) // CREATE NEW POSITION

/**
 * @swagger
 * /api/position:
 *   get:
 *     summary: Get all position
 *     tags:
 *       - Position
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully all positions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Position'
 *       400:
 *         description: Positions not found!
 *       500:
 *         description: Internal server error 
 * 
 */

router.get("/position", jwtCtrl.verifyToken, positionCtrl.getPositions) // GET ALL POSITION

/**
 * @swagger
 * /api/position/{id}:
 *   get:
 *     summary: Get position by id
 *     tags:
 *       - Position
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the position to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully position found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Position'
 *       400:
 *         description: position not found!
 *       500:
 *         description: Internal server error 
 * 
 */

router.get("/position/:id", jwtCtrl.verifyToken, positionCtrl.getPositionById) // GET A ONE POSITION

/**
 * @swagger
 * /api/position/{id}:
 *   put:
 *     summary: Update a position
 *     tags:
 *       - Position
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the position to get
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
 *               $ref: '#/components/schemas/Position'
 *       400:
 *         description: Position or code already in use!
 *       500:
 *         description: Internal server error 
 * 
 */

router.put('/position/:id', [jwtCtrl.verifyToken, jwtCtrl.isModerator], positionCtrl.updatePosition) // UPDATE A POSITION

/**
 * @swagger
 * /api/position/{id}/status:
 *   put:
 *     summary: Change status position
 *     tags:
 *       - Position
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the position to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully status changed
 *       400:
 *         description: Position not found!
 *       500:
 *         description: Internal server error 
 * 
 */

router.put('/position/:id/status', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], positionCtrl.changeStatusPosition) // CHANGE STATUS

/**
 * @swagger
 * /api/position/{id}:
 *   delete:
 *     summary: Delete a position
 *     tags:
 *       - Position
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the position to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully deleted position
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error 
 * 
 */

router.delete('/position/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], positionCtrl.deletePosition) // DELETE A POSITION

export default router;
