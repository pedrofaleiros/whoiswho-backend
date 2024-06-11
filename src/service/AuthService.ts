// import { hash } from "bcryptjs"
// import { UserModel } from "../model/UserModel"
// import { verifyPassword } from "../utils/verifyPassword"
// import { getJWT } from "../utils/getJWT"
import UserRepository from "../repository/UserRepository"
import { ResourceNotFoundError, UsecaseError, ValidationError } from "../utils/errors"

class AuthService {

    private repository: UserRepository

    constructor() {
        this.repository = new UserRepository()
    }

    async createUser() {
        const username = await this.generateUsername();
        return await this.repository.create({
            username: username
        })
    }

    async session(userId: string) {
        if (typeof userId !== 'string') throw new ValidationError('Usuário inválido');
        const user = await this.repository.findById(userId)
        if (user === null) {
            throw new ResourceNotFoundError('Usuário não encontrado')
        }
        return user
    }

    async updateUsername(userId: string, username: string) {
        const findUserById = await this.repository.findById(userId)
        if (findUserById === null) throw new ResourceNotFoundError("Usuário não encontrado");

        this.validateUsername(username)

        const findUserByUsername = await this.repository.findByUsername(username)
        if (findUserByUsername !== null && findUserByUsername.id !== findUserById.id) {
            throw new UsecaseError("Nome de usuário já utilizado.");
        }

        return await this.repository.updateUsername(findUserById.id, username);
    }

    private async generateUsername(): Promise<string> {
        var username = this.generateCode();
        while (await this.repository.findByUsername(username) !== null) {
            username = this.generateCode();
        }
        return username;
    }

    private generateCode(): string {
        const randomNumber = Math.floor(Math.random() * 10000);
        const randomNumberString = randomNumber.toString().padStart(4, '0');
        return `User${randomNumberString}`;
    }

    private validateUsername(username: any) {
        if (typeof username !== 'string' || username.length < 3 || username.length > 32) {
            throw new ValidationError("Nome de usuário inválido.");
        }
    }

    // async login(userId: string, username: string) {
    //     if (typeof username !== "string") throw new ValidationError("Username inválido.")
    //     const findUserById = await this.repository.findById(userId)
    //     if (findUserById == null) throw new ResourceNotFoundError('Usuário não encontrado.');
    //     const findUserByUsername = await this.repository.findByUsername(username)
    //     if (findUserByUsername == null) throw new ResourceNotFoundError('Usuário não encontrado.');
    //     const token = getJWT(findUserById.id, findUserById.username)
    //     return {
    //         id: findUserById.id,
    //         username: findUserById.username,
    //         token: token,
    //     }
    // }
}

export default AuthService