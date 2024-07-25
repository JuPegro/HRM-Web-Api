import { Router } from "express";

const router = Router();

// IMPORT JWT CONTROLLER
import * as jwtCtrl from "../middlewares/authJwt.js";

// IMPORT REVIEWER CONTROLLER
import * as reviewerCtrl from "../controllers/reviewer.controller.js";

/**
 * @swagger
 * /api/reviewer:
 *   post:
 *     summary: Create a new reviewer
 *     tags:
 *       - Reviewer
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
 *             properties:
 *               employeeId:
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

router.post('/reviewer', [jwtCtrl.verifyToken, jwtCtrl.isModerator], reviewerCtrl.createReviewer) // CREATE NEW REVIEWER

/**
 * @swagger
 * /api/reviewer:
 *   get:
 *     summary: Get all reviewer
 *     tags:
 *       - Reviewer
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully get all reviewers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Reviewer'
 *             example:
 *               reviewers:
 *                  - id: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
 *                    employeeId: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe"
 *                    departmentId: "4ac6b8c5-c0d6-46cb-824c-85308635e9df"
 *                    status: "ACTIVE"
 *                    createdAt: "2024-07-05T00:42:17.715Z"
 *                    updatedAt: "2024-07-05T00:42:17.715Z"
 *                  - id: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
 *                    employeeId: "9931af52-0875-41ee-977d-0b25a9524e0c"
 *                    departmentId: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe"
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

router.get("/reviewer", jwtCtrl.verifyToken, reviewerCtrl.getReviewers) // GET ALL REVIEWER

/**
 * @swagger
 * /api/reviewer/{id}:
 *   get:
 *     summary: Get reviewer by id
 *     tags:
 *       - Reviewer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the reviewer to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully get reviewer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *               $ref: '#/components/schemas/Reviewer'
 *             example:
 *               reviewer:
 *                  - id: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
 *                    employeeId: "9931af52-0875-41ee-977d-0b25a9524e0c"
 *                    departmentId: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe"
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

router.get("/reviewer/:id", jwtCtrl.verifyToken, reviewerCtrl.getReviewerById) // GET A ONE REVIEWER

/**
 * @swagger
 * /api/reviewer/{id}:
 *   put:
 *     summary: Update a reviewer
 *     tags:
 *       - Reviewer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the reviewer to get
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
 *             properties:
 *               employeeId:
 *                 type: string
 *                 example: 90acb06b-3dea-4483-b106-e85f30a2b986
 *     responses:
 *       200:
 *         description: Successfully updated reviewer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Reviewer'
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

router.put('/reviewer/:id', [jwtCtrl.verifyToken, jwtCtrl.isModerator], reviewerCtrl.updateReviewer) // UPDATE A REVIEWER

/**
 * @swagger
 * /api/reviewer/{id}/status:
 *   put:
 *     summary: Change status reviewer
 *     tags:
 *       - Reviewer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the reviewer to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully change status reviewer
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

router.put('/reviewer/:id/status', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], reviewerCtrl.changeStatusReviewer) // CHANGE STATUS

/**
 * @swagger
 * /api/reviewer/{id}:
 *   delete:
 *     summary: Delete a reviewer
 *     tags:
 *       - Reviewer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the reviewer to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully deleted reviewer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Successfully deleted reviewer
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

router.delete('/reviewer/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], reviewerCtrl.deleteReviewer) // DELETE A REVIEWER

export default router;
