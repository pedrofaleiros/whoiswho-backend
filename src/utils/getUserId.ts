import { verify } from "jsonwebtoken";
import Env from "../env";

interface PayLoad {
    sub: string;
}

export default function getUserId(token: string): string | null {
    try {

        const { sub } = verify(
            token,
            Env.JWT_SECRET as string,
        ) as PayLoad;

        return sub;
    } catch (error) {
        return null
    }
}