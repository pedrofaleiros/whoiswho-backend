import { Place } from "@prisma/client";
import prismaClient from "../utils/prismaClient";
import { PlaceModel } from "../model/PlaceModel";

class PlaceRepository {

    async findById(id: string): Promise<Place | null> {
        return await prismaClient.place.findUnique({ where: { id: id } })
    }

    async findProfessionById(id: string) {
        return await prismaClient.profession.findUnique({ where: { id: id } })
    }

    async findAll() {
        return await prismaClient.place.findMany({
            where: { placeCategoryId: null },
            include: { Professions: true },
            orderBy: { name: "asc" }
        })
    }

    async findAllByCategory(id: string) {
        return await prismaClient.place.findMany({
            where: { placeCategoryId: id },
            include: { Professions: true },
            orderBy: { name: "asc" }
        })
    }

    async findAllByUser(id: string) {
        return await prismaClient.place.findMany({
            where: { userId: id },
            include: { Professions: true },
            orderBy: { name: "asc" }
        })
    }

    async search(text: string) {
        return await prismaClient.place.findMany({
            where: { name: { contains: text, mode: "insensitive" } },
            include: { Professions: true },
            orderBy: { name: "asc" }
        })
    }

    async getGamePlaces(categoryId: string | null) {
        return await prismaClient.place.findMany({
            where: { placeCategoryId: categoryId },
            include: { Professions: true }
        })
    }

    async createPlace(place: PlaceModel) {
        return await prismaClient.place.create({
            data: {
                name: place.name,
                placeCategoryId: place.categoryId,
                userId: place.userId,
            }
        })
    }

    async addProfession(name: string, placeId: string) {
        return await prismaClient.profession.create({
            data: {
                name: name,
                placeId: placeId,
            }
        })
    }

    async deletePlace(id: string) {
        return await prismaClient.place.delete({ where: { id: id } })
    }

    async deleteProfession(id: string) {
        return await prismaClient.profession.delete({ where: { id: id } })
    }

}

export default PlaceRepository