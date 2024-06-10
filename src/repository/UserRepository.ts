import { User } from "@prisma/client";
import prismaClient from "../utils/prismaClient";
import { UserModel } from "../model/UserModel";

class UserRepository {

    async findById(id: string): Promise<User | null> {
        return await prismaClient.user.findUnique({ where: { id: id } })
    }

    async findByUsername(username: string): Promise<User | null> {
        return await prismaClient.user.findUnique({ where: { username: username } })
    }

    async updateUsername(id: string, username: string) {
        return await prismaClient.user.update({
            where: { id: id },
            data: { username: username }
        })
    }

    async create(user: UserModel) {
        return await prismaClient.user.create({
            data: { username: user.username }
        })
    }
}

export default UserRepository