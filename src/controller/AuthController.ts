import { Request, Response } from "express";
import AuthService from "../service/AuthService";

class AuthController {

    private service: AuthService

    constructor() {
        this.service = new AuthService()
        this.session = this.session.bind(this);
        this.createUser = this.createUser.bind(this);
        this.setUsername = this.setUsername.bind(this);
    }

    async session(req: Request, res: Response) {
        const { userId } = req.params;
        const data = await this.service.session(userId)
        return res.json(data)
    }

    async createUser(_: Request, res: Response) {
        const user = await this.service.createUser();
        return res.json(user);
    }

    async setUsername(req: Request, res: Response) {
        const { userId } = req.params;
        const { username } = req.body;
        const user = await this.service.updateUsername(userId, username);
        return res.json(user);
    }
}

export default AuthController 