import express from 'express';
import {signupUser} from '../controllers/signupController.js';
import {loginUser} from "../controllers/loginController.js";
import {forgotPassword} from "../controllers/forgotPasswordController.js"
import { resetPassword } from '../controllers/resetPasswordController.js';

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/forgotpassword", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;