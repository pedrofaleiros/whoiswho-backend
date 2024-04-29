import { Router } from "express";
import AuthController from "./controller/AuthController";
import PlaceController from "./controller/PlaceController";
import { isAuthenticaded } from "./utils/middlewares/isAuthenticated";
import RoomController from "./controller/RoomController";

const auth = new AuthController();
const place = new PlaceController()
const room = new RoomController()

const router = Router();

router.post('/auth/signup', auth.signup)
router.post('/auth', auth.login)
router.post('/session', isAuthenticaded, auth.session)

router.get('/place', isAuthenticaded, place.getAll)
router.post('/place', isAuthenticaded, place.createPlace)
router.post('/place/profession', isAuthenticaded, place.addProfession)
router.delete('/place/:id', isAuthenticaded, place.deletePlace)
router.delete('/place/profession/:id', isAuthenticaded, place.deleteProfession)

router.post('/room', isAuthenticaded, room.createRoom)
router.get('/room', isAuthenticaded, room.listRooms)

export { router };