import { Server, Socket } from "socket.io"
import { SocketConst } from "../../utils/SocketConstants"
import { SocketError } from "../../utils/errors"
import SocketService from "./SocketService"

class CreateRoomService extends SocketService {

    async handle(io: Server, socket: Socket, data: any) {
        try {
            const { userId } = data

            if (typeof userId !== 'string') throw new SocketError('Usuário inválido.');
            const user = await this.userR.findById(userId)
            if (user === null) throw new SocketError('Usuário não encontrado.');

            const findPlayer = await this.playerR.findById(user.id)
            if (findPlayer !== null)
                throw new SocketError('Usuário já esta em uma sala');

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
                socket.emit(SocketConst.DISCONNECT_ERROR, error.message)
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