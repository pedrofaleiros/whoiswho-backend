import { Server, Socket } from "socket.io";
import SocketService from "./SocketService";
import { SocketError } from "../../utils/errors";
import { SocketConst } from "../../utils/SocketConstants";

class SetImpostorsService extends SocketService {
    async handle(io: Server, socket: Socket, data: any) {
        try {
            const { userId, num, roomCode } = data

            const user = await this.validateUser(userId)
            const room = await this.validateRoom(roomCode)

            if (user.id !== room.admId) throw new SocketError('Não autorizado');
            if (typeof num !== 'number' || num > 3 || num < 1) {
                socket.emit(SocketConst.WARNING, 'Número inválido de impostores.')
                return
            }

            const updatedRoom = await this.roomR.setImpostors(room.code, num)

            await this.roomImpostorsToAll(io, updatedRoom)

        } catch (error) {
            if (error instanceof SocketError) {
                socket.emit(SocketConst.WARNING, error.message)
            }
        }
    }
}

export default SetImpostorsService