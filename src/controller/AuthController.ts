import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../model/UserModel";
import AuthService from "../service/AuthService";

class AuthController {

    private service: AuthService

    constructor() {
        this.service = new AuthService()
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
        this.session = this.session.bind(this)
    }

    async signup(req: Request, res: Response) {
        const user: UserModel = req.body
        const created = await this.service.signup(user)

        const data = await this.service.login({
            username: created.username,
            password: user.password,
        })

        return res.json(data)
    }

    async login(req: Request, res: Response) {
        const user: UserModel = req.body
        const data = await this.service.login(user)
        return res.json(data)
    }

    async session(req: Request, res: Response) {
        const data = await this.service.session(req.user_id)
        return res.json(data)
    }
}

export default AuthController 