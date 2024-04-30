import { Request, Response } from "express";
import PlaceService from "../service/PlaceService"
import { StatusCodes } from "http-status-codes";

class PlaceController {

    private service: PlaceService

    constructor() {
        this.service = new PlaceService()
        this.listPlaces = this.listPlaces.bind(this)
        this.createPlace = this.createPlace.bind(this)
        this.addProfession = this.addProfession.bind(this)
        this.deletePlace = this.deletePlace.bind(this)
        this.deleteProfession = this.deleteProfession.bind(this)
    }

    async listPlaces(req: Request, res: Response) {
        const { name } = req.query
        const data = await this.service.getPlaces(typeof name === 'string' ? name : null);
        return res.json(data)
    }

    async createPlace(req: Request, res: Response) {
        const { name } = req.body
        return res.json(await this.service.createPlace(name))
    }

    async addProfession(req: Request, res: Response) {
        const { name } = req.body
        const { placeId } = req.params
        return res.json(await this.service.addProfession(name, placeId))
    }

    async deletePlace(req: Request, res: Response) {
        const { id } = req.params
        await this.service.deletePlace(id)
        return res.sendStatus(StatusCodes.NO_CONTENT)
    }

    async deleteProfession(req: Request, res: Response) {
        const { id } = req.params
        await this.service.deleteProfession(id)
        return res.sendStatus(StatusCodes.NO_CONTENT)
    }
}

export default PlaceController