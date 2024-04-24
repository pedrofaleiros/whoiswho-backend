import { Router } from "express";
import AuthController from "./controller/AuthController";
import PlaceController from "./controller/PlaceController";
import { isAuthenticaded } from "./utils/middlewares/isAuthenticated";

const auth = new AuthController();
const place = new PlaceController()

const router = Router();

router.post('/auth/signup', auth.signup)
router.post('/auth', auth.login)
router.post('/session', isAuthenticaded, auth.session)

router.get('/place', isAuthenticaded, place.getAll)

export { router };