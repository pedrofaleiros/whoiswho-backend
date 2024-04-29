import { Server, Socket } from "socket.io";
import SocketService from "./SocketService";
import { SocketError } from "../../utils/errors";
import { SocketConst } from "../../utils/SocketConstants";
import PlaceRepository from "../../repository/PlaceRepository";
import { Player } from "@prisma/client";

class StartGameService extends SocketService {
    async handle(io: Server, socket: Socket, data: any) {
        try {
            const { token } = data

            const player = await this.validatePlayer(token);
            const room = await this.validateRoom(player.roomCode)

            if (player.userId !== room.admId) throw new SocketError('Apenas o ADM pode iniciar a partida.');

            if (room.status === "playing") throw new SocketError('A partida já foi iniciada.');

            const roomPlayers = await this.playerR.listByRoom(room.code)

            if (room.impostors >= roomPlayers.length / 2) throw new SocketError('Impostores devem ser minoria na partida');

            // Gera local aleatorio
            const place = await this.getRandomPlace(roomPlayers.length - room.impostors)
            // Gera profissoes aleatorias
            const professions = this.getPlayersProfession(roomPlayers, place.professions, room.impostors);

            const updatedRoom = await this.roomR.startGame(room.code, place.placeId, professions)

            // Contagem
            await this.countDown(io, updatedRoom)

            await this.gameData(io, updatedRoom)
            await this.roomStatusToAll(io, updatedRoom)

        } catch (error) {
            if (error instanceof SocketError) {
                socket.emit(SocketConst.WARNING, error.message)
            }
        }
    }

    private async getRandomPlace(num: number): Promise<GamePlace> {
        // Todos os places
        const aux = await new PlaceRepository().getGamePlaces()
        const places = this.shuffleArray(aux)

        // Filtra apenas os que possuem pelo menos N professions
        const validPlaces = places.filter(p => p.Professions.length >= num)
        if (validPlaces.length === 0) throw new SocketError('Nenhum local para essa quantidade de jogadores');

        const index = Math.floor(Math.random() * validPlaces.length)
        const place = validPlaces[index]

        return {
            place: place.name,
            placeId: place.id,
            professions: place.Professions.map(prof => prof.name)
        }
    }

    private getPlayersProfession(players: Player[], professions: string[], num: number): GameProfession[] {
        const list: GameProfession[] = []
        for (var p of players) {
            list.push({
                username: p.username,
                isImpostor: false,
                playerId: p.userId,
                profession: null
            })
        }

        // Atribui impostores
        let imp = 0
        while (imp < num) {
            const index = Math.floor(Math.random() * list.length);
            if (list[index].isImpostor === false) {
                list[index].isImpostor = true;
                imp += 1;
            }
        }

        // Embaralha profissoes
        const shuffle = this.shuffleArray(professions)

        // Atribui funcoes
        for (let i = 0; i < list.length; i++) {
            if (!list[i].isImpostor) {
                list[i].profession = shuffle[i]
            }
        }
        return list
    }

    private shuffleArray<T>(array: T[]): T[] {
        let shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }
}

interface GamePlace {
    place: string,
    placeId: string,
    professions: string[]
}
interface GameProfession {
    playerId: string,
    username: string,
    isImpostor: boolean,
    profession: string | null,
}

export default StartGameService