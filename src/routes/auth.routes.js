import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller.js";

router.post("/signin", authCtrl.signin);

export default router;
