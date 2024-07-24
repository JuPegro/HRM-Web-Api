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
 *                 example: Technical support
 *               description:
 *                 type: string
 *                 example: an advice service provided by a computer company
 *               departmentId:
 *                 type: string
 *                 example: 90acb06b-3dea-4483-b106-e85f30a2b986
 *     responses:
 *       201:
 *         description: Successfully created position
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Position'
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

router.post('/position', jwtCtrl.verifyToken, positionCtrl.createPosition) // CREATE NEW POSITION

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
 *         description: Successfully get all positions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Position'
 *             example:
 *               positions:
 *                  - id: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
 *                    name: "Web Developer"
 *                    description: "Create new system webs"
 *                    departmentId: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe"
 *                    status: "ACTIVE"
 *                    createdAt: "2024-07-05T00:42:17.715Z"
 *                    updatedAt: "2024-07-05T00:42:17.715Z"
 *                  - id: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
 *                    name: "Technical support"
 *                    description: "an advice service provided by a computer company"
 *                    departmentId: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe"
 *                    status: "INACTIVE"
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
 *         description: Successfully get position
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Position'
 *             example:
 *               position:
 *                  - id: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
 *                    name: "Technical support"
 *                    description: "an advice service provided by a computer company"
 *                    departmentId: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe"
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
 *                 example: Technical support
 *               description:
 *                 type: string
 *                 example: an advice service provided by a computer company
 *               departmentId:
 *                 type: string
 *                 example: 90acb06b-3dea-4483-b106-e85f30a2b986
 *     responses:
 *       200:
 *         description: Successfully update position
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Position'
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

router.put('/position/:id', jwtCtrl.verifyToken, positionCtrl.updatePosition) // UPDATE A POSITION

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
 *         description: Successfully change status position
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Successfully deleted position
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

router.delete('/position/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], positionCtrl.deletePosition) // DELETE A POSITION

export default router;
