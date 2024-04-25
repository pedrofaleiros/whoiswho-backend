import { Server, Socket } from "socket.io";
import SocketService from "./SocketService";
import { SocketError } from "../../utils/errors";
import { SocketConst } from "../../utils/SocketConstants";
import getUserId from "../../utils/getUserId";

class FinishGameService extends SocketService {
    async handle(io: Server, socket: Socket, data: any) {
        try {
            const { token } = data

            const userId = getUserId(token)
            if (typeof userId !== 'string') throw new SocketError('Usuário inválido.');
            const player = await this.playerR.findById(userId)
            if (player === null) throw new SocketError('Jogador não encontrado.');

            const room = await this.roomR.findByCode(player.roomCode)
            if (room === null) throw new SocketError('Sala não encontrada.');
            if (room.status !== "playing") throw new SocketError('A partida não foi iniciada.');

            const updatedRoom = await this.roomR.finishGame(room.code)

            await this.roomStatusToAll(io, updatedRoom)
            await this.gameData(io, updatedRoom)

        } catch (error) {
            if (error instanceof SocketError) {
                socket.emit(SocketConst.WARNING, error.message)
            }
        }
    }
}


export default FinishGameService