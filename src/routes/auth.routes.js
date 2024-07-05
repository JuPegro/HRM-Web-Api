import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller.js";

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in to the application
 *     tags:
 *       - Auth
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
 *                 example: Admin@example.com
 *               password:
 *                 type: string
 *                 example: AdminPassword
 *     responses:
 *       200:
 *         description: Successfully signed in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *       400:
 *         description: Invalid username or password
 */

router.post("/signin", authCtrl.signin);

export default router;
