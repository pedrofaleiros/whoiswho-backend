import { Server, Socket } from "socket.io";
import SocketService from "./SocketService";
import { SocketError } from "../../utils/errors";
import { SocketConst } from "../../utils/SocketConstants";

class JoinRoomService extends SocketService {
    async handle(io: Server, socket: Socket, data: any) {
        try {
            const { roomCode, token } = data

            const user = await this.validateUser(token);
            const room = await this.validateRoom(roomCode);

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
            await this.gameData(io, room)

        } catch (error) {
            if (error instanceof SocketError) {
                socket.emit(SocketConst.DISCONNECT_ERROR, error.message)
            }
            socket.disconnect()
        }

    }
}

export default JoinRoomService