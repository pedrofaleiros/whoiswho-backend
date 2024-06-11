import RoomRepository from "../repository/RoomRepository"
import UserRepository from "../repository/UserRepository"
import { ResourceNotFoundError } from "../utils/errors"

class RoomService {

    private repository: RoomRepository
    private userRepository: UserRepository

    constructor() {
        this.repository = new RoomRepository()
        this.userRepository = new UserRepository()
    }

    async findUserRoom(userId: string) {
        const room = await this.repository.findUserRoom(userId)

        if (room === null) return null;

        const now = new Date()

        const dif = this.dateDif(room.createdAt, now)

        if (dif > 60 * 5) return null

        return room.code
    }

    async listRooms() {
        const rooms = await this.repository.listRooms()

        return rooms.map(r => ({
            roomCode: r.code,
            adm: r.Adm.username,
            status: r.status,
        }))
    }

    async createRoom(userId: string): Promise<string> {
        const user = await this.userRepository.findById(userId)
        if (user === null) throw new ResourceNotFoundError('Usuário não encontrado.')

        const roomCode = await this.getRoomCode()

        const room = await this.repository.create({
            admId: user.id,
            code: roomCode,
            password: null,
        })

        return room.code
    }

    private dateDif(startDate: Date, finalDate: Date): number {
        const dif = finalDate.getTime() - startDate.getTime();
        const difMin = dif / (1000 * 60);
        return difMin;
    }

    private async getRoomCode(): Promise<string> {
        const rooms = await this.repository.listRooms()
        const len = rooms.length + 1
        if (len >= 0 && len < 10) {
            return `000${len}`
        } else if (len < 100) {
            return `00${len}`
        } else if (len < 1000) {
            return `0${len}`
        }
        return `${len}`
        // var roomCode = this.generateRoomCode()
        // while (await this.repository.findByCode(roomCode) !== null) {
        //     roomCode = this.generateRoomCode()
        // }
        // return roomCode
    }

    private generateRoomCode(): string {
        const randomNumber = Math.floor(Math.random() * 10000);
        const randomNumberString = randomNumber.toString().padStart(4, '0');
        return randomNumberString;
    }
}

export default RoomService