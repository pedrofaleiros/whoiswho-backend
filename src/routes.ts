import { Router } from "express";
import AuthController from "./controller/AuthController";

const auth = new AuthController();
const router = Router();

router.post('/auth/signup', auth.signup)
router.post('/auth', auth.login)

export { router };