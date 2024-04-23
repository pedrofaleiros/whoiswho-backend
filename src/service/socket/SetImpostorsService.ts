import { Server, Socket } from "socket.io";
import SocketService from "./SocketService";
import { SocketError } from "../../utils/errors";
import { SocketConst } from "../../utils/SocketConstants";
import getUserId from "../../utils/getUserId";

class SetImpostorsService extends SocketService {
    async handle(io: Server, socket: Socket, data: any) {
        try {
            const { token, num, roomCode } = data

            const userId = getUserId(token)

            if (typeof userId !== 'string') throw new SocketError('Usuário inválido.');
            if (typeof roomCode !== 'string') throw new SocketError('Código inválido.');

            const user = await this.userR.findById(userId)
            if (user === null) throw new SocketError('Usuário não encontrado.');

            const room = await this.roomR.findByCode(roomCode)
            if (room === null) throw new SocketError('Sala não encontrada.');

            if (user.id !== room.admId) throw new SocketError('Não autorizado');

            if (typeof num !== 'number' || num > 3 || num < 1) {
                socket.emit(SocketConst.WARNING, 'Numero inválido de impostores.')
                return
            }

            const updatedRoom = await this.roomR.setImpostors(room.code, num)

            await this.roomImpostorsToAll(io, updatedRoom)

        } catch (error) {
            if (error instanceof SocketError) {
                socket.emit(SocketConst.DISCONNECT_ERROR, error.message)
            }
            socket.disconnect()
        }
    }
}

export default SetImpostorsService