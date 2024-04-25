import { Player } from "@prisma/client";
import { PlayerModel } from "../model/PlayerModel";
import prismaClient from "../utils/prismaClient";

class PlayerRepository {

    async findById(id: string): Promise<Player | null> {
        return await prismaClient.player.findUnique({
            where: { userId: id }
        })
    }

    async findBySocketId(id: string): Promise<Player | null> {
        return await prismaClient.player.findUnique({
            where: { socketId: id }
        })
    }

    async save(player: PlayerModel) {
        return await prismaClient.player.upsert({
            where: { userId: player.userId },
            create: {
                userId: player.userId,
                roomCode: player.roomCode,
                username: player.username,
                socketId: player.socketId,
            },
            update: {
                roomCode: player.roomCode,
                username: player.username,
                socketId: player.socketId,
            },
        })
    }

    async listByRoom(roomCode: string): Promise<Player[]> {
        return await prismaClient.player.findMany({
            where: {
                roomCode: roomCode,
                socketId: { not: null }
            }
        })
    }

    async listPlayerProfessions(roomCode: string) {
        return await prismaClient.playerProfession.findMany({
            where: { roomCode: roomCode },
            include: {
                player: true
            }
        })
    }

    async delete(id: string) {
        return await prismaClient.player.delete({
            where: { userId: id }
        })
    }

    async removeSocketId(id: string) {
        return await prismaClient.player.update({
            where: { userId: id },
            data: { socketId: null }
        })
    }
}

export default PlayerRepository