import { Server, Socket } from "socket.io";
import { SocketConst } from "../utils/SocketConstants";
import JoinRoomService from "../service/socket/JoinRoomService";
import DisconnectService from "../service/socket/DisconnectService";
import LeaveAllService from "../service/socket/LeaveAllService";
import SetImpostorsService from "../service/socket/SetImpostorsService";
import StartGameService from "../service/socket/StartGameService";
import FinishGameService from "../service/socket/FinishGameService";
class SocketController {

    private joinRoom: JoinRoomService
    private disconnect: DisconnectService
    private leaveAll: LeaveAllService
    private setImpostors: SetImpostorsService
    private startGame: StartGameService
    private finishGame: FinishGameService

    constructor() {
        this.joinRoom = new JoinRoomService()
        this.disconnect = new DisconnectService()
        this.leaveAll = new LeaveAllService()
        this.setImpostors = new SetImpostorsService()
        this.startGame = new StartGameService()
        this.finishGame = new FinishGameService()
    }

    async handleConnection(io: Server, socket: Socket) {
        socket.on(
            SocketConst.JOIN_ROOM,
            async (data) => await this.joinRoom.handle(io, socket, data)
        );

        socket.on(
            SocketConst.DISCONNECT,
            async (_) => await this.disconnect.handle(io, socket)
        );

        socket.on(
            SocketConst.SET_IMPOSTORS,
            async (data) => await this.setImpostors.handle(io, socket, data)
        )

        socket.on(
            SocketConst.START_GAME,
            async (data) => await this.startGame.handle(io, socket, data)
        )

        socket.on(
            SocketConst.FINISH_GAME,
            async (data) => await this.finishGame.handle(io, socket, data)
        )

        socket.on('leaveAll',
            async (data) => await this.leaveAll.handle(io, socket, data)
        )
    }
}

export default SocketController