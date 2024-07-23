import { Router } from "express";

const router = Router();

// IMPORT JWT CONTROLLER
import * as jwtCtrl from "../middlewares/authJwt.js";

// IMPORT LICENSE CONTROLLER
import * as licenseCtrl from "../controllers/license.controller.js";

/**
 * @swagger
 * /api/license:
 *   post:
 *     summary: Create a new license
 *     tags:
 *       - License
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
 *         description: Successfully created license
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/License'
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

router.post('/license', jwtCtrl.verifyToken, licenseCtrl.createLicense) // CREATE NEW LICENSE

/**
 * @swagger
 * /api/license:
 *   get:
 *     summary: Get all license
 *     tags:
 *       - License
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully get all licenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/License'
 *             example:
 *               licenses:
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

router.get("/license", jwtCtrl.verifyToken, licenseCtrl.getLicense) // GET ALL LICENSE

/**
 * @swagger
 * /api/license/{id}:
 *   get:
 *     summary: Get license by id
 *     tags:
 *       - License
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the license to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully get license
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/License'
 *             example:
 *               license:
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

router.get("/license/:id", jwtCtrl.verifyToken, licenseCtrl.getLicenseById) // GET A ONE LICENSE

/**
 * @swagger
 * /api/license/{id}:
 *   put:
 *     summary: Update a license
 *     tags:
 *       - License
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the license to get
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
 *         description: Successfully update license
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/License'
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

router.put('/license/:id', jwtCtrl.verifyToken, licenseCtrl.updateLicense) // UPDATE A LICENSE

/**
 * @swagger
 * /api/license/{id}/status:
 *   put:
 *     summary: Change status license
 *     tags:
 *       - License
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the license to update
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
 *         description: Successfully change status license
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

router.put('/license/:id/status', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], licenseCtrl.changeStatusLicense) // CHANGE STATUS

/**
 * @swagger
 * /api/license/{id}:
 *   delete:
 *     summary: Delete a license
 *     tags:
 *       - License
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the license to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully deleted license
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Successfully deleted license
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

router.delete('/license/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], licenseCtrl.deleteLicense) // DELETE A LICENSE

export default router;
