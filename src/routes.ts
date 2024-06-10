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

router.post('/auth', auth.createUser)
router.post('/auth/session/:userId', auth.session)
router.put('/auth/:userId', auth.setUsername)

router.post('/room/:userId', room.createRoom)
router.get('/room/last/:userId', room.findUserRoom)
// router.get('/room', room.listRooms)
// --------------------------------------------------

router.get('/place', place.listPlaces)
router.get('/place/category/:id', place.listPlacesByCategory)
router.get('/place/user/:userId', place.listUserPlaces)

router.post('/place/:userId', place.createPlace)
router.post('/place/:id/profession/:userId', place.addProfession)
router.delete('/place/:id', place.deletePlace)
router.delete('/place/profession/:id', place.deleteProfession)
router.get('/category', category.listAll)

router.get("/", (req, res) => {
    return res.json({ status: "Ok" })
})

export { router };