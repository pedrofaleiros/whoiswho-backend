import { PlaceModel } from "../model/PlaceModel";
import CategoryRepository from "../repository/CategoryRepository";
import PlaceRepository from "../repository/PlaceRepository"
import UserRepository from "../repository/UserRepository";
import { ResourceNotFoundError, ValidationError } from "../utils/errors"

class PlaceService {
    private repository: PlaceRepository
    private categoryRepository: CategoryRepository
    private userRepository: UserRepository

    constructor() {
        this.repository = new PlaceRepository()
        this.categoryRepository = new CategoryRepository()
        this.userRepository = new UserRepository()
    }

    async getPlaces(text: string | null) {
        var places;
        if (text === null) places = await this.repository.findAll();
        else places = await this.repository.search(text);
        return this.formatPlaces(places)
    }

    async getPlacesByCategory(categoryId: string) {
        if (typeof categoryId !== 'string') throw new ValidationError('Categoria inválida.')

        const category = await this.categoryRepository.findById(categoryId)
        if (category === null) throw new ValidationError('Categoria inválida.')

        const places = await this.repository.findAllByCategory(category.id)
        return this.formatPlaces(places)
    }

    async getPlacesByUser(userId: string) {
        if (typeof userId !== 'string') throw new ValidationError('Usuário inválido.')

        const user = await this.userRepository.findById(userId)
        if (user === null) throw new ValidationError('Usuário inválida.')

        const places = await this.repository.findAllByUser(user.id)
        return this.formatPlaces(places)
    }

    async createPlace(place: PlaceModel) {
        if (typeof place.name !== 'string' || place.name.length > 64 || place.name.length < 3)
            throw new ValidationError('Nome inválido.');

        if (place.categoryId !== null) {
            const category = await this.categoryRepository.findById(place.categoryId)
            if (category === null)
                throw new ResourceNotFoundError('Categoria não encontrada');
        }

        return await this.repository.createPlace(place)
    }

    async addProfession(name: string, placeId: string, userId: string) {
        const place = await this.repository.findById(placeId)
        if (!place || place.userId !== userId)
            throw new ResourceNotFoundError('Local não encontrado.');

        if (typeof name !== 'string' || name.length > 64 || name.length < 3)
            throw new ValidationError('Nome inválido.');

        return await this.repository.addProfession(name, placeId)
    }

    async deletePlace(id: string) {
        const place = await this.repository.findById(id)
        if (!place) throw new ResourceNotFoundError('Local não encontrado.');
        return await this.repository.deletePlace(place.id)
    }

    async deleteProfession(id: string) {
        const prof = await this.repository.findProfessionById(id)
        if (!prof) throw new ResourceNotFoundError('Profissão não encontrado.');
        return await this.repository.deleteProfession(prof.id)
    }

    private formatPlaces(places: ({
        Professions: {
            id: string;
            name: string;
            placeId: string;
        }[];
    } & {
        id: string;
        name: string;
        placeCategoryId: string | null;
        userId: string | null;
    })[]) {
        return places.map(p => ({
            id: p.id,
            name: p.name,
            professions: p.Professions.map(prof => ({
                id: prof.id,
                name: prof.name,
            }))
        }));
    }
}

export default PlaceService