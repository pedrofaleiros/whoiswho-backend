import { Server, Socket } from "socket.io";
import { SocketConst } from "../utils/SocketConstants";
import JoinRoomService from "../service/socket/JoinRoomService";
import DisconnectService from "../service/socket/DisconnectService";
import SetImpostorsService from "../service/socket/SetImpostorsService";
import StartGameService from "../service/socket/StartGameService";
import FinishGameService from "../service/socket/FinishGameService";
import SetCategoryService from "../service/socket/SetCategoryService";
import RemovePlayerService from "../service/socket/RemovePlayerService";
class SocketController {

    private joinRoom: JoinRoomService
    private disconnect: DisconnectService
    private setImpostors: SetImpostorsService
    private startGame: StartGameService
    private finishGame: FinishGameService
    private setCategory: SetCategoryService
    private removePlayer: RemovePlayerService

    constructor() {
        this.joinRoom = new JoinRoomService()
        this.disconnect = new DisconnectService()
        this.setImpostors = new SetImpostorsService()
        this.startGame = new StartGameService()
        this.finishGame = new FinishGameService()
        this.setCategory = new SetCategoryService()
        this.removePlayer = new RemovePlayerService()
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
            SocketConst.REMOVE_PLAYER,
            async (data) => await this.removePlayer.handle(io, socket, data)
        );

        socket.on(
            SocketConst.SET_IMPOSTORS,
            async (data) => await this.setImpostors.handle(io, socket, data)
        )

        socket.on(
            SocketConst.SET_CATEGORY,
            async (data) => await this.setCategory.handle(io, socket, data)
        )

        socket.on(
            SocketConst.START_GAME,
            async (data) => await this.startGame.handle(io, socket, data)
        )

        socket.on(
            SocketConst.FINISH_GAME,
            async (data) => await this.finishGame.handle(io, socket, data)
        )
    }
}

export default SocketController