import { Request, Response } from "express"
import RoomService from "../service/RoomService"

class RoomController {

    private service: RoomService

    constructor() {
        this.service = new RoomService()
        this.createRoom = this.createRoom.bind(this)
    }

    async createRoom(req: Request, res: Response) {
        const userId = req.user_id
        const code = await this.service.createRoom(userId)
        return res.json({ roomCode: code })
    }

}

export default RoomController