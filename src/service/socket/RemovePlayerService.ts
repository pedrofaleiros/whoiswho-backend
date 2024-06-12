import { Server, Socket } from "socket.io";
import SocketService from "./SocketService";
import { SocketError } from "../../utils/errors";
import { SocketConst } from "../../utils/SocketConstants";

class RemovePlayerService extends SocketService {
    async handle(io: Server, socket: Socket, data: any) {
        try {
            const { roomCode, userId, removeId } = data

            await this.validateUser(userId);
            const room = await this.validateRoom(roomCode);
            if (userId !== room.admId) throw new SocketError('Não autorizado.')
            
            const removeUser = await this.validateUser(removeId);

            const findPlayer = await this.playerR.findById(removeUser.id)
            if (findPlayer && findPlayer.socketId) {
                await this.disconnectPlayer(io, room, findPlayer)
            }
        } catch (error) {
            if (error instanceof SocketError) {
                socket.emit(SocketConst.ERROR, error.message)
            }
            socket.disconnect()
        }
    }
}

export default RemovePlayerService