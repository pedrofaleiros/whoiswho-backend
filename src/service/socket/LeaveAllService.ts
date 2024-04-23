import { Server, Socket } from "socket.io";
import SocketService from "./SocketService";
import { SocketError } from "../../utils/errors";
import { SocketConst } from "../../utils/SocketConstants";
import getUserId from "../../utils/getUserId";

class LeaveAllService extends SocketService {
    async handle(io: Server, socket: Socket, data: any) {
        try {
            const { token } = data
            const userId = getUserId(token)

            if (typeof userId !== 'string') throw new SocketError('Usuário inválido.');
            const user = await this.userR.findById(userId)
            if (user === null) throw new SocketError('Usuário não encontrado.');

            const player = await this.playerR.findById(user.id)
            if (player === null) return;

            const room = await this.roomR.findByCode(player.roomCode)
            if (room === null) throw new SocketError('Sala não encontrada.');

            // Remove o player da sala
            await this.removePlayer(io, room, player)

            await this.roomPlayers(io, room)

        } catch (error) {
            if (error instanceof SocketError) {
                socket.emit(SocketConst.DISCONNECT_ERROR, error.message)
            }
            socket.disconnect()
        }
    }
}

export default LeaveAllService