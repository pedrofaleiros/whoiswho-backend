import { Request, Response } from "express"
import RoomService from "../service/RoomService"

class RoomController {

    private service: RoomService

    constructor() {
        this.service = new RoomService()
        this.createRoom = this.createRoom.bind(this)
        this.listRooms = this.listRooms.bind(this)
    }

    async createRoom(req: Request, res: Response) {
        const userId = req.user_id
        const code = await this.service.createRoom(userId)
        return res.json({ roomCode: code })
    }

    async listRooms(req: Request, res: Response) {
        const data = await this.service.listRooms()
        return res.json(data)
    }

}

export default RoomController