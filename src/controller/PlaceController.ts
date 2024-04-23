import { Request, Response } from "express";
import PlaceService from "../service/PlaceService"

class PlaceController {

    private service: PlaceService

    constructor() {
        this.service = new PlaceService()
        this.getAll = this.getAll.bind(this)
    }

    async getAll(req: Request, res: Response) {
        const data = await this.service.findAll();
        return res.json(data)
    }
}

export default PlaceController