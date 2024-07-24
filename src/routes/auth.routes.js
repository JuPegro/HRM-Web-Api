import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller.js";

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Create a new auth
 *     tags:
 *       - Auth
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: JuPegro@example.com
 *               password:
 *                 type: string
 *                 example: Password!@2024
 *     responses:
 *       200:
 *         description: Successfully signed in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignInResponse'
 *       401:
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServer'
 * 
 */

router.post("/signin", authCtrl.signin);

export default router;
