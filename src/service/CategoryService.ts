import { CategoryModel } from "../model/CategoryModel"
import CategoryRepository from "../repository/CategoryRepository"
import PlaceRepository from "../repository/PlaceRepository"
import { ResourceNotFoundError, ValidationError } from "../utils/errors"

class CategoryService {

    private repository: CategoryRepository
    private placeRepository: PlaceRepository

    constructor() {
        this.repository = new CategoryRepository()
        this.placeRepository = new PlaceRepository()
    }

    async create(category: CategoryModel) {
        if (typeof category.name !== 'string' || category.name.length < 2 || category.name.length > 64)
            throw new ValidationError('Nome inválido.');
        return await this.repository.create(category)
    }

    async listAll() {
        return this.repository.listAll()
    }

    async addPlace(categoryId: string, placeId: string) {
        const category = await this.repository.findById(categoryId)
        if (category === null) throw new ResourceNotFoundError('Categoria não encontrada.');

        const place = await this.placeRepository.findById(placeId)
        if (place === null) throw new ResourceNotFoundError('Local não encontrado.');

        await this.repository.addPlace(category.id, place.id)
    }

    async delete(id: string) {
        const category = await this.repository.findById(id)
        if (category === null) throw new ResourceNotFoundError('Categoria não encontrada.');
        return await this.repository.delete(category.id)
    }
}

export default CategoryService