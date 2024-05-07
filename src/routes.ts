import { Router } from "express";
import AuthController from "./controller/AuthController";
import PlaceController from "./controller/PlaceController";
import { isAuthenticaded } from "./utils/middlewares/isAuthenticated";
import RoomController from "./controller/RoomController";
import CategoryController from "./controller/CategoryController";

const auth = new AuthController();
const place = new PlaceController()
const room = new RoomController()
const category = new CategoryController()

const router = Router();

router.post('/auth/signup', auth.signup)
router.post('/auth', auth.login)
router.post('/session', isAuthenticaded, auth.session)

router.get('/place', isAuthenticaded, place.listPlaces)
router.get('/place/category/:id', isAuthenticaded, place.listPlacesByCategory)
router.post('/place', isAuthenticaded, place.createPlace)
router.post('/place/:id/profession', isAuthenticaded, place.addProfession)
router.delete('/place/:id', isAuthenticaded, place.deletePlace)
router.delete('/place/profession/:id', isAuthenticaded, place.deleteProfession)

router.get('/category', isAuthenticaded, category.listAll)

router.post('/room', isAuthenticaded, room.createRoom)
router.get('/room', isAuthenticaded, room.listRooms)
router.get('/room/last', isAuthenticaded, room.findUserRoom)

export { router };