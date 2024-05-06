import { PlaceCategory } from "@prisma/client";
import { CategoryModel } from "../model/CategoryModel";
import prismaClient from "../utils/prismaClient";

class CategoryRepository {

    async findById(id: string): Promise<PlaceCategory | null> {
        return await prismaClient.placeCategory.findUnique({ where: { id: id } })
    }

    async listAll(): Promise<PlaceCategory[]> {
        return await prismaClient.placeCategory.findMany()
    }

    async create(category: CategoryModel) {
        return await prismaClient.placeCategory.create({
            data: {
                name: category.name,
                description: category.description,
            }
        })
    }

    async delete(id: string) {
        return await prismaClient.placeCategory.delete({ where: { id: id } })
    }

    async addPlace(categoryId: string, placeId: string) {
        await prismaClient.place.update({
            where: { id: placeId },
            data: { placeCategoryId: categoryId }
        })
    }
}

export default CategoryRepository