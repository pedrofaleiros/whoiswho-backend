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

    async listPlacesByCategory(req: Request, res: Response) {
        const { id } = req.params
        const data = await this.service.getPlacesByCategory(id);
        return res.json(data)
    }

    async createPlace(req: Request, res: Response) {
        const { name, categoryId } = req.body
        const userId = req.user_id
        await this.service.createPlace({
            name: name,
            categoryId: categoryId ?? null,
            userId: userId,
        })
        return res.sendStatus(StatusCodes.CREATED)
    }

    async addProfession(req: Request, res: Response) {
        const userId = req.user_id
        const { name } = req.body
        const { placeId } = req.params
        return res.json(await this.service.addProfession(name, placeId, userId))
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