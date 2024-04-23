import { Server, Socket } from "socket.io";
import { SocketConst } from "../utils/SocketConstants";
import CreateRoomService from "../service/socket/CreateRoomService";
import JoinRoomService from "../service/socket/JoinRoomService";
import DisconnectService from "../service/socket/DisconnectService";
import LeaveAllService from "../service/socket/LeaveAllService";
import SetImpostorsService from "../service/socket/SetImpostorsService";
class SocketController {

    private createRoom: CreateRoomService
    private joinRoom: JoinRoomService
    private disconnect: DisconnectService
    private leaveAll: LeaveAllService
    private setImpostors: SetImpostorsService

    constructor() {
        this.createRoom = new CreateRoomService()
        this.joinRoom = new JoinRoomService()
        this.disconnect = new DisconnectService()
        this.leaveAll = new LeaveAllService()
        this.setImpostors = new SetImpostorsService()
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

        socket.on(
            SocketConst.SET_IMPOSTORS,
            async (data) => await this.setImpostors.handle(io, socket, data)
        )

        socket.on('leaveAll',
            async (data) => await this.leaveAll.handle(io, socket, data)
        )
    }
}

export default SocketController