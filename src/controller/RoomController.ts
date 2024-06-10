import { Request, Response } from "express"
import RoomService from "../service/RoomService"

class RoomController {

    private service: RoomService

    constructor() {
        this.service = new RoomService()
        this.createRoom = this.createRoom.bind(this)
        this.listRooms = this.listRooms.bind(this)
        this.findUserRoom = this.findUserRoom.bind(this)
    }

    async createRoom(req: Request, res: Response) {
        const { userId } = req.params
        const code = await this.service.createRoom(userId)
        return res.json({ roomCode: code })
    }

    async findUserRoom(req: Request, res: Response) {
        const { userId } = req.params
        const data = await this.service.findUserRoom(userId)
        return res.json({ roomCode: data })
    }

    async listRooms(req: Request, res: Response) {
        const data = await this.service.listRooms()
        return res.json(data)
    }
}

export default RoomController