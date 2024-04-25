import { Server, Socket } from "socket.io";
import SocketService from "./SocketService";
import { SocketError } from "../../utils/errors";
import { SocketConst } from "../../utils/SocketConstants";
import getUserId from "../../utils/getUserId";
import PlaceRepository from "../../repository/PlaceRepository";
import { Player } from "@prisma/client";

class StartGameService extends SocketService {
    async handle(io: Server, socket: Socket, data: any) {
        try {
            const { token } = data

            const userId = getUserId(token)
            if (typeof userId !== 'string') throw new SocketError('Usuário inválido.');
            const player = await this.playerR.findById(userId)
            if (player === null) throw new SocketError('Jogador não encontrado.');

            const room = await this.roomR.findByCode(player.roomCode)
            if (room === null) throw new SocketError('Sala não encontrada.');
            if (room.status === "playing") throw new SocketError('A partida já foi iniciada.');

            const roomPlayers = await this.playerR.listByRoom(room.code)

            const place = await getRandomPlace(roomPlayers.length - room.impostors)
            if (place === null) throw new SocketError('Nenhum local para essa quantidade de jogadores');

            const professions = getPlayersProfession(roomPlayers, place.professions, room.impostors);

            const updatedRoom = await this.roomR.startGame(room.code, place.placeId, professions)

            await this.roomStatusToAll(io, updatedRoom)
            await this.gameData(io, updatedRoom)

        } catch (error) {
            if (error instanceof SocketError) {
                socket.emit(SocketConst.WARNING, error.message)
            }
        }
    }
}

interface GameProfession {
    playerId: string,
    username: string,
    isImpostor: boolean,
    profession: string | null,
}

async function getRandomPlace(num: number): Promise<{ place: string, placeId: string, professions: string[] } | null> {
    // Todos os places
    const aux = await new PlaceRepository().getGamePlaces()

    const places = shuffleArray(aux)

    // Filtra apenas os que possuem pelo menos N professions
    const validPlaces = places.filter(p => p.Professions.length >= num)
    if (validPlaces.length === 0) return null

    const index = Math.floor(Math.random() * validPlaces.length)
    const place = validPlaces[index]

    return {
        place: place.name,
        placeId: place.id,
        professions: place.Professions.map(prof => prof.name)
    }
}

function getPlayersProfession(players: Player[], professions: string[], num: number): GameProfession[] {

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
    const shuffle = shuffleArray(professions)

    // Atribui funcoes
    for (let i = 0; i < list.length; i++) {
        if (!list[i].isImpostor) {
            list[i].profession = shuffle[i]
        }
    }

    return list
}

function shuffleArray<T>(array: T[]): T[] {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

export default StartGameService