import { hash } from "bcryptjs"
import UserRepository from "../repository/UserRepository"
import { UserModel } from "../model/UserModel"
import { verifyPassword } from "../utils/verifyPassword"
import { getJWT } from "../utils/getJWT"
import { ResourceNotFoundError, UsecaseError, ValidationError } from "../utils/errors"
import validateUser from "../utils/validator/vaildateUser"

class AuthService {

    private repository: UserRepository

    constructor() {
        this.repository = new UserRepository()
    }

    async session(userId: string) {
        const user = await this.repository.findById(userId)
        if (user === null) throw new ResourceNotFoundError('Usuário não encontrado.');
        return {
            id: user.id,
            username: user.username,
            token: getJWT(user.id, user.username),
        }
    }

    async login(user: UserModel) {
        if (typeof user.username !== "string") throw new ValidationError("Username inválido.")
        if (typeof user.password !== "string") throw new ValidationError("Senha inválida.")

        // Verifica se o usuario existe
        const findUser = await this.repository.findByUsername(user.username)
        if (findUser == null) throw new ResourceNotFoundError('Usuário não encontrado.');

        await verifyPassword(user.password, findUser.password)

        const token = getJWT(findUser.id, findUser.username)

        return {
            id: findUser.id,
            username: findUser.username,
            token: token,
        }
    }

    async signup(user: UserModel) {
        validateUser(user);

        // Verifica se username já está cadastrado
        const findUsername = await this.repository.findByUsername(user.username)
        if (findUsername != null) throw new UsecaseError('Username já cadastrado.')

        // Faz o hash da senha
        const hashedPassword = await hash(user.password, 8)

        // Cria usuario
        await this.repository.create({
            username: user.username,
            password: hashedPassword,
        })
    }
}

export default AuthService