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

    async create(user: UserModel) {
        await prismaClient.user.create({
            data: {
                username: user.username,
                password: user.password,
            }
        })
    }
}

export default UserRepository