import { Place } from "@prisma/client";
import prismaClient from "../utils/prismaClient";

class PlaceRepository {

    async findAll(): Promise<Place[]> {
        return await prismaClient.place.findMany()
    }
}

export default PlaceRepository