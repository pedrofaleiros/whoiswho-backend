import { Server, Socket } from "socket.io";
import { SocketConst } from "../utils/SocketConstants";
import CreateRoomService from "../service/socket/CreateRoomService";
import JoinRoomService from "../service/socket/JoinRoomService";
import DisconnectService from "../service/socket/DisconnectService";

class SocketController {

    private createRoom: CreateRoomService
    private joinRoom: JoinRoomService
    private disconnect: DisconnectService

    constructor() {
        this.createRoom = new CreateRoomService()
        this.joinRoom = new JoinRoomService()
        this.disconnect = new DisconnectService()
    }

    async handleConnection(io: Server, socket: Socket) {

        // Criar sala
        socket.on(
            SocketConst.CREATE_ROOM,
            async (data) => await this.createRoom.handle(io, socket, data)
        );

        // Entrar na sala
        socket.on(
            SocketConst.JOIN_ROOM,
            async (data) => await this.joinRoom.handle(io, socket, data)
        );

        socket.on(
            SocketConst.DISCONNECT,
            async (data) => await this.disconnect.handle(io, socket)
        );
    }
}

export default SocketController