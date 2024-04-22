import { sign } from "jsonwebtoken";
import Env from "../env";

export function getJWT(id: string, username: string): string {
    const jwtSecret = Env.JWT_SECRET

    if (jwtSecret == undefined) {
        throw new Error('Erro no servidor: JWT')
    }

    return sign(
        {
            name: username,
        },
        jwtSecret,
        {
            subject: id,
            expiresIn: '7d'
        }
    );
}