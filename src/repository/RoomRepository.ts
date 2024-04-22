import { Room } from "@prisma/client";
import prismaClient from "../utils/prismaClient";
import { RoomModel } from "../model/RoomModel";

class RoomRepository {

    async findByCode(code: string): Promise<Room | null> {
        return await prismaClient.room.findUnique({
            where: { code: code }
        })
    }

    async create(room: RoomModel) {
        return await prismaClient.room.create({
            data: {
                code: room.code,
                admId: room.admId,
            }
        })
    }
}

export default RoomRepository;