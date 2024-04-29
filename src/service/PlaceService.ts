import PlaceRepository from "../repository/PlaceRepository"
import { ResourceNotFoundError, ValidationError } from "../utils/errors"

class PlaceService {
    private repository: PlaceRepository

    constructor() {
        this.repository = new PlaceRepository()
    }

    async findAll() {
        return (await this.repository.findAll()).map(p => ({
            id: p.id,
            name: p.name,
            professions: p.Professions.map(prof => ({
                id: prof.id,
                name: prof.name,
            }))
        }))
    }

    async createPlace(name: string) {
        if (typeof name !== 'string' || name.length > 64 || name.length < 3)
            throw new ValidationError('Nome inválido.');

        return await this.repository.createPlace(name)
    }

    async addProfession(name: string, placeId: string) {
        const place = await this.repository.findById(placeId)
        if (!place) throw new ResourceNotFoundError('Local não encontrado.');

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
}

export default PlaceService