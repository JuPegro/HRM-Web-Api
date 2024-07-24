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
 *               - name
 *               - lastname
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: JuPegro
 *               lastname:
 *                 type: string
 *                 example: Developer
 *               email:
 *                 type: string
 *                 example: JuPegro@example.com
 *               password:
 *                 type: string
 *                 example: Password!@2024
 *               role:
 *                 type: string
 *                 example: MODERATOR
 *     responses:
 *       201:
 *         description: Successfully created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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

router.post("/user",[ jwtCtrl.verifyToken, jwtCtrl.isAdmin ] ,userCtrl.createUser); // CREATE NEW USER

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all user
 *     tags:
 *       - User
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successfully get all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               users:
 *                  - id: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
 *                    name: "Administrator"
 *                    lastname: "Default"
 *                    email: "Admin@example.com"
 *                    role: "ADMIN"
 *                    status: "ACTIVE"
 *                    createdAt: "2024-07-05T00:42:17.715Z"
 *                    updatedAt: "2024-07-05T00:42:17.715Z"
 *                  - id: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
 *                    name: "Moderator"
 *                    lastname: "Default"
 *                    email: "Moderator@example.com"
 *                    role: "MODERATOR"
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

router.get("/user",jwtCtrl.verifyToken, userCtrl.getUsers); // GET ALL USERS

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by id
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
 *         description: Successfully get user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               user:
 *                  - id: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
 *                    name: "Moderator"
 *                    lastname: "Default"
 *                    email: "Moderator@example.com"
 *                    role: "MODERATOR"
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

router.get("/user/:id",jwtCtrl.verifyToken, userCtrl.getUserById); // GET AN USERS

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update a user
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
 *             type: object
 *             required:
 *               - name
 *               - lastname
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: JuPegro
 *               lastname:
 *                 type: string
 *                 example: Developer
 *               email:
 *                 type: string
 *                 example: JuPegro@example.com
 *               password:
 *                 type: string
 *                 example: Password!@2024
 *               role:
 *                 type: string
 *                 example: MODERATOR
 *     responses:
 *       200:
 *         description: Successfully update user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/User'
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

router.put("/user/:id",[ jwtCtrl.verifyToken, jwtCtrl.isAdmin ], userCtrl.updateUser); // UPDATE AN USER

/**
 * @swagger
 * /api/user/{id}/status:
 *   put:
 *     summary: Change status user
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
 *         description: Successfully change status user
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

router.put("/user/:id/status",[ jwtCtrl.verifyToken, jwtCtrl.isAdmin ], userCtrl.changeStatusUser); // CHANGE STATUS OF USER

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Successfully deleted user
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

router.delete("/user/:id",[ jwtCtrl.verifyToken, jwtCtrl.isAdmin ], userCtrl.deleteUser); // DELETE AN USER

export default router;
