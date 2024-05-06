import { Request, Response } from "express";
import CategoryService from "../service/CategoryService";

class CategoryController {

    private service: CategoryService

    constructor() {
        this.service = new CategoryService()
        this.listAll = this.listAll.bind(this)
    }

    async listAll(req: Request, res: Response) {
        const data = await this.service.listAll()
        return res.json(data)
    }
}

export default CategoryController