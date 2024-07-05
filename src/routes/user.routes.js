import { Router } from "express";
const router = Router();

//  IMPORT USER CONTROLLER
import * as userCtrl from "../controllers/user.controller.js";

// IMPORT AUTHJWT
import * as jwtCtrl from "../middlewares/authJwt.js";

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
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
 *                 example: Admin@example.com
 *               password:
 *                 type: string
 *                 example: AdminPassword
 *     responses:
 *       200:
 *         description: Successfully created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignInResponse'
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error 
 * 
 */

router.post("/user",[ jwtCtrl.verifyToken, jwtCtrl.isModerator ] ,userCtrl.createUser); // CREATE NEW USER

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully gat all users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignInResponse'
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error 
 * 
 */

router.get("/user",jwtCtrl.verifyToken, userCtrl.getUsers); // GET ALL USERS

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get an users
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully found user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error 
 * 
 */
router.get("/user/:id",jwtCtrl.verifyToken, userCtrl.getUserById); // GET AN USERS

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update an user
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to get
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully update
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignInResponse'
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error 
 * 
 */

router.put("/user/:id",[ jwtCtrl.verifyToken, jwtCtrl.isModerator ], userCtrl.updateUser); // UPDATE AN USER

/**
 * @swagger
 * /api/user/{id}/status:
 *   put:
 *     summary: Update an user
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully status changed
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error 
 * 
 */

router.put("/user/:id/status",[ jwtCtrl.verifyToken, jwtCtrl.isAdmin ], userCtrl.changeStatusUser); // CHANGE STATUS OF USER

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete an user
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to get
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully deleted user
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error 
 * 
 */

router.delete("/user/:id",[ jwtCtrl.verifyToken, jwtCtrl.isAdmin ], userCtrl.deleteUser); // DELETE AN USER

export default router;
