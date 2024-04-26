import { Player, Room, User } from "@prisma/client"
import { Server, Socket } from "socket.io"
import { SocketConst } from "../../utils/SocketConstants"
import UserRepository from "../../repository/UserRepository"
import RoomRepository from "../../repository/RoomRepository"
import PlayerRepository from "../../repository/PlayerRepository"
import PlaceRepository from "../../repository/PlaceRepository"
import { SocketError } from "../../utils/errors"
import getUserId from "../../utils/getUserId"

class SocketService {
    protected userR: UserRepository
    protected roomR: RoomRepository
    protected playerR: PlayerRepository
    protected placeR: PlaceRepository

    constructor() {
        this.userR = new UserRepository()
        this.roomR = new RoomRepository()
        this.playerR = new PlayerRepository()
        this.placeR = new PlaceRepository()
    }

    protected async gameData(io: Server, room: Room) {
        const place = await this.placeR.findById(room.placeId ?? "")
        if (place && room.status !== "idle") {
            const playerProfessions = await this.playerR.listPlayerProfessions(room.code)

            io.to(room.code).emit(SocketConst.GAME_DATA, {
                place: place.name,
                professions: playerProfessions.map(p => ({
                    username: p.player.username,
                    playerId: p.player.userId,
                    isImpostor: p.isImpostor,
                    profession: p.isImpostor ? null : p.profession,
                }))
            })
        }
    }

    protected async roomCode(socket: Socket, room: Room) {
        socket.emit(SocketConst.ROOM_CODE, room.code)
    }

    protected async roomStatusToAll(io: Server, room: Room) {
        io.to(room.code).emit(SocketConst.GAME_STATUS, room.status)
    }

    protected async roomStatus(socket: Socket, room: Room) {
        socket.emit(SocketConst.GAME_STATUS, room.status)
    }

    protected async roomImpostorsToAll(io: Server, room: Room) {
        io.to(room.code).emit(SocketConst.GAME_IMPOSTORS, room.impostors)
    }

    protected async roomImpostors(socket: Socket, room: Room) {
        socket.emit(SocketConst.GAME_IMPOSTORS, room.impostors)
    }

    protected async roomPlayers(io: Server, room: Room) {
        const data: Player[] = await this.playerR.listByRoom(room.code)

        const players = data.map(p => ({
            id: p.userId,
            username: p.username,
        }));

        io.to(room.code).emit(SocketConst.GAME_PLAYERS, {
            admId: room.admId,
            players: players,
        })
    }

    protected async disconnectPlayer(io: Server, room: Room, player: Player) {
        if (player.socketId) {
            const socketToRemove = io.sockets.sockets.get(player.socketId)

            if (socketToRemove) {
                socketToRemove.emit(SocketConst.DISCONNECT_ERROR, 'Você foi removido da sala.')
                socketToRemove.leave(room.code)
                socketToRemove.disconnect()

                await this.playerR.removeSocketId(player.userId)
                await this.roomPlayers(io, room)
            }
        }
    }

    protected async validateRoom(roomCode: any): Promise<Room> {
        if (typeof roomCode !== 'string') throw new SocketError('Código da sala inválido.');
        const room = await this.roomR.findByCode(roomCode);
        if (room === null) throw new SocketError('Sala não encontrada.');
        return room;
    }

    protected async validateUser(token: any): Promise<User> {
        const userId = getUserId(token);
        if (!userId) throw new SocketError('Usuário inválido.');
        const user = await this.userR.findById(userId);
        if (user === null) throw new SocketError('Usuário não encontrado.');
        return user;
    }

    protected async validatePlayer(token: any): Promise<Player> {
        const userId = getUserId(token);
        if (!userId) throw new SocketError('Usuário inválido.');
        const player = await this.playerR.findById(userId);
        if (player === null) throw new SocketError('Jogador não encontrado.');
        return player;
    }
}

export default SocketService