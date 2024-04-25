import { Place } from "@prisma/client";
import prismaClient from "../utils/prismaClient";

class PlaceRepository {



    async findById(id: string): Promise<Place | null> {
        return await prismaClient.place.findUnique({ where: { id: id } })
    }

    async findAll(): Promise<Place[]> {
        return await prismaClient.place.findMany()
    }

    async getGamePlaces() {
        return await prismaClient.place.findMany({
            include: { Professions: true }
        })
    }


}

export default PlaceRepository