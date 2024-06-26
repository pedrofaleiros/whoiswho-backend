import { Server, Socket } from "socket.io";
import SocketService from "./SocketService";

class DisconnectService extends SocketService {

    async handle(io: Server, socket: Socket) {
        try {
            const player = await this.playerR.findBySocketId(socket.id)
            if (player) {
                await this.playerR.removeSocketId(player.userId);
                const room = await this.roomR.findByCode(player.roomCode);
                if (room) await this.roomPlayers(io, room);
            }
        } catch (_) { }
    }
}

export default DisconnectService