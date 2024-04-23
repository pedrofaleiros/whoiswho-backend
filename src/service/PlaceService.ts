import PlaceRepository from "../repository/PlaceRepository"

class PlaceService {
    private repository: PlaceRepository

    constructor() {
        this.repository = new PlaceRepository()
    }

    async findAll() {
        return await this.repository.findAll()
    }
}

export default PlaceService