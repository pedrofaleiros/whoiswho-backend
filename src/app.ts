import express from 'express'
import cors from 'cors'
import Env from './env'
import { SocketConst } from './utils/SocketConstants'
import { createServer, Server } from 'http'
import { Server as ServerSocketIo } from "socket.io"
import { handleError } from './utils/errors/handleError'
import { createClient, RedisClientType } from 'redis'
import { createAdapter } from '@socket.io/redis-adapter'
import { router } from './routes'
import SocketController from './controller/SocketController'
import prismaClient from './utils/prismaClient'
import { createPlaces } from './utils/routines/createPlaces'
import { deleteRooms } from './utils/routines/deleteRooms'
import { deleteUsers } from './utils/routines/deleteUsers'

class App {

    constructor() {
        this.app = express()
        this.expressConfig()

        this.server = createServer(this.app)

        this.socketController = new SocketController()
        this.socketIo = new ServerSocketIo(this.server, { cors: { origin: "*" } })

        const redisUrl = Env.REDIS_URL
        this.pubClient = createClient({ url: redisUrl })
        this.subClient = this.pubClient.duplicate()
    }

    public async start() {
        await this.pubClient.connect()
        await this.subClient.connect()

        this.socketIo.adapter(createAdapter(this.pubClient, this.subClient))

        this.socketIo.on(
            SocketConst.CONNECTION,
            (socket) => this.socketController.handleConnection(this.socketIo, socket)
        )

        this.server.listen(Env.PORT, async () => {
            console.clear()
            await createPlaces()
            await deleteRooms(12)
            await deleteUsers(12)
            console.log(`\nrunning at ${Env.PORT}`)
        })
    }

    private app: express.Application
    private server: Server
    private socketIo: ServerSocketIo

    private socketController: SocketController

    private pubClient: RedisClientType
    private subClient: RedisClientType

    private expressConfig() {
        this.app.use(cors({ origin: "*" }))
        this.app.use(express.json())
        this.app.use(router)
        this.app.use(handleError())
    }

    private async _printPlayers() {
        const players = await prismaClient.player.findMany()
        players.forEach(p => {
            console.log(`${p.roomCode}; ${p.username}; ${p.socketId};`)
        })
    }

    private async _printRooms() {
        const rooms = await prismaClient.room.findMany()
        rooms.forEach(r => {
            console.log(`${r.code}; ${r.createdAt}`)
        })
    }
}

export default App