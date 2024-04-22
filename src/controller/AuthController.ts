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
    }

    async signup(req: Request, res: Response) {
        const user: UserModel = req.body
        await this.service.signup(user)
        return res.sendStatus(StatusCodes.CREATED)
    }

    async login(req: Request, res: Response) {
        const user: UserModel = req.body
        const data = await this.service.login(user)
        return res.json(data)
    }
}

export default AuthController 