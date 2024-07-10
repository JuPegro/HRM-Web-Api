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
 *         description: Successfully created license
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/License'
 *       400:
 *         description: License name already in use
 *       500:
 *         description: Internal server error 
 * 
 */

router.post('/license', [jwtCtrl.verifyToken, jwtCtrl.isModerator], licenseCtrl.createLicense) // CREATE NEW LICENSE

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
 *         description: Successfully all licenses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/License'
 *       400:
 *         description: Licenses not found!
 *       500:
 *         description: Internal server error 
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
 *         description: Successfully license found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/License'
 *       400:
 *         description: License not found!
 *       500:
 *         description: Internal server error 
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
 *               $ref: '#/components/schemas/License'
 *       400:
 *         description: License or code already in use!
 *       500:
 *         description: Internal server error 
 * 
 */

router.put('/license/:id', [jwtCtrl.verifyToken, jwtCtrl.isModerator], licenseCtrl.updateLicense) // UPDATE A LICENSE

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
 *         description: ID of the license to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully status changed
 *       400:
 *         description: License not found!
 *       500:
 *         description: Internal server error 
 * 
 */

router.put('/license/:id/status', [jwtCtrl.verifyToken], jwtCtrl.isAdmin, licenseCtrl.changeStatusLicense) // CHANGE STATUS

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
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error 
 * 
 */

router.delete('/license/:id', [jwtCtrl.verifyToken, jwtCtrl.isAdmin], licenseCtrl.deleteLicense) // DELETE A LICENSE

export default router;
