import { Server, Socket } from "socket.io";
import SocketService from "./SocketService";
import { SocketError } from "../../utils/errors";
import { SocketConst } from "../../utils/SocketConstants";

class SetCategoryService extends SocketService {
    async handle(io: Server, socket: Socket, data: any) {
        try {
            const { userId, roomCode, categoryId } = data

            const user = await this.validateUser(userId)
            const room = await this.validateRoom(roomCode)

            if (user.id !== room.admId) throw new SocketError('Não autorizado');

            var updateId: string | null
            if (categoryId === null) {
                updateId = null;
            } else {
                const category = await this.categoryR.findById(categoryId);
                if (category === null) throw new SocketError('Categoria inválida.');
                updateId = category.id
            }

            const updatedRoom = await this.roomR.setCategory(room.code, updateId)

            await this.roomCategoryToAll(io, updatedRoom)

        } catch (error) {
            if (error instanceof SocketError) {
                socket.emit(SocketConst.WARNING, error.message)
            }
        }
    }
}

export default SetCategoryService