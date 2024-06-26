import { Room } from "@prisma/client";
import prismaClient from "../utils/prismaClient";
import { RoomModel } from "../model/RoomModel";

interface GameProfession {
    playerId: string,
    username: string,
    isImpostor: boolean,
    profession: string | null,
}

class RoomRepository {

    async finishGame(code: string) {
        return await prismaClient.room.update({
            where: { code: code },
            data: {
                isOpen: true,
                status: "finished",
            }
        })
    }

    async startGame(code: string, placeId: string, professions: GameProfession[]) {

        await prismaClient.playerProfession.deleteMany({ where: { roomCode: code } });

        for (var prof of professions) {
            await prismaClient.playerProfession.create({
                data: {
                    roomCode: code,
                    playerUserId: prof.playerId,
                    isImpostor: prof.isImpostor,
                    profession: prof.profession
                }
            })
        }

        return await prismaClient.room.update({
            where: { code: code },
            data: {
                isOpen: false,
                status: "playing",
                placeId: placeId,
            }
        })
    }

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

    async setImpostors(code: string, num: number) {
        return await prismaClient.room.update({
            where: { code: code },
            data: { impostors: num }
        })
    }

    async setCategory(code: string, categoryId: string | null) {
        return await prismaClient.room.update({
            where: { code: code },
            data: { placeCategoryId: categoryId }
        })
    }

    async listRooms() {
        return await prismaClient.room.findMany({
            include: { Adm: true }
        })
    }

    async findUserRoom(userId: string): Promise<Room | null> {
        const player = await prismaClient.player.findUnique({ where: { userId: userId } })
        if (player === null) return null;
        const room = await prismaClient.room.findUnique({ where: { code: player.roomCode } })
        if (room === null) return null;
        return room
    }
}

export default RoomRepository;