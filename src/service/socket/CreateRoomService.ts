import { Server, Socket } from "socket.io"
import { SocketConst } from "../../utils/SocketConstants"
import { SocketError } from "../../utils/errors"
import SocketService from "./SocketService"
import getUserId from "../../utils/getUserId"

class CreateRoomService extends SocketService {

    async handle(io: Server, socket: Socket, data: any) {
        try {
            const { token } = data

            const userId = getUserId(token)

            if (typeof userId !== 'string') throw new SocketError('Usuário inválido.');
            const user = await this.userR.findById(userId)
            if (user === null) throw new SocketError('Usuário não encontrado.');

            const findPlayer = await this.playerR.findById(user.id)
            if (findPlayer !== null && findPlayer.socketId !== null) {
                if (findPlayer.socketId === socket.id) return;
                // Remove conexao com o socket que estiver na sala
                const room = await this.roomR.findByCode(findPlayer.roomCode)
                if (room) await this.disconnectPlayer(io, room, findPlayer);
            }

            const roomCode = await this.getRoomCode()
            const room = await this.roomR.create({
                admId: user.id,
                code: roomCode,
                password: null,
            })

            await this.playerR.save({
                userId: user.id,
                username: user.username,
                roomCode: room.code,
                socketId: socket.id,
            })

            socket.join(room.code)

            this.roomCode(socket, room)
            this.roomStatus(socket, room)
            this.roomImpostors(socket, room)
            await this.roomPlayers(io, room)

        } catch (error) {
            if (error instanceof SocketError) {
                socket.emit(SocketConst.ERROR, error.message)
            }
            socket.disconnect()
        }
    }

    private async getRoomCode(): Promise<string> {
        var roomCode = this.generateRoomCode()
        while (await this.roomR.findByCode(roomCode) !== null) {
            roomCode = this.generateRoomCode()
        }
        return roomCode
    }

    private generateRoomCode(): string {
        const randomNumber = Math.floor(Math.random() * 10000);
        const randomNumberString = randomNumber.toString().padStart(4, '0');
        return randomNumberString;
    }
}

export default CreateRoomService