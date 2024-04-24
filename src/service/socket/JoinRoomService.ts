import { Server, Socket } from "socket.io";
import SocketService from "./SocketService";
import { SocketError } from "../../utils/errors";
import { SocketConst } from "../../utils/SocketConstants";
import getUserId from "../../utils/getUserId";

class JoinRoomService extends SocketService {
    async handle(io: Server, socket: Socket, data: any) {
        try {
            const { roomCode, token } = data

            const userId = getUserId(token)

            if (typeof userId !== 'string') throw new SocketError('Usuário inválido.');
            if (typeof roomCode !== 'string') throw new SocketError('Código inválido.');

            const user = await this.userR.findById(userId)
            if (user === null) throw new SocketError('Usuário não encontrado.');

            const room = await this.roomR.findByCode(roomCode)
            if (room === null) throw new SocketError('Sala não encontrada.');
            if (!room.isOpen) throw new SocketError('A sala esta fechada.');

            // Verifica se o usuario ja esta ativo em uma sala
            const findPlayer = await this.playerR.findById(user.id)
            if (findPlayer !== null && findPlayer.socketId !== null) {
                // Remove conexao com o socket que estiver na sala
                if (findPlayer.socketId === socket.id) return;
                await this.disconnectPlayer(io, room, findPlayer)
            }

            await this.playerR.save({
                userId: user.id,
                username: user.username,
                roomCode: room.code,
                socketId: socket.id,
            })

            socket.join(room.code)

            this.roomStatus(socket, room)
            this.roomImpostors(socket, room)
            await this.roomPlayers(io, room)

        } catch (error) {
            if (error instanceof SocketError) {
                socket.emit(SocketConst.DISCONNECT_ERROR, error.message)
            }
            socket.disconnect()
        }
    }
}

export default JoinRoomService