import { Player, Room } from "@prisma/client"
import { Server, Socket } from "socket.io"
import { SocketConst } from "../../utils/SocketConstants"
import UserRepository from "../../repository/UserRepository"
import RoomRepository from "../../repository/RoomRepository"
import PlayerRepository from "../../repository/PlayerRepository"

class SocketService {
    protected userR: UserRepository
    protected roomR: RoomRepository
    protected playerR: PlayerRepository

    constructor() {
        this.userR = new UserRepository()
        this.roomR = new RoomRepository()
        this.playerR = new PlayerRepository()
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
        if (player.socketId !== null) {
            const socketToRemove = io.sockets.sockets.get(player.socketId)
            
            if (socketToRemove) {
                socketToRemove.emit(SocketConst.DISCONNECT_ERROR, 'Você foi removido da sala.')
                socketToRemove.leave(room.code)
                socketToRemove.disconnect()

                await this.playerR.delete(player.userId)
                await this.roomPlayers(io, room)
            }
        }
    }
}

export default SocketService