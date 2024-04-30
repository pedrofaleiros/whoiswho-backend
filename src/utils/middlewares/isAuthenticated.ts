import { NextFunction, Request, Response } from "express";
import Env from "../../env";
import { verify } from "jsonwebtoken";
import prismaClient from "../prismaClient";
import { NotAuthError } from "../errors";

interface PayLoad {
    sub: string;
}

export async function isAuthenticaded(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) return res.status(401).end();

    const [, token] = authToken.split(' ');

    try {
        const { sub } = verify(
            token,
            Env.JWT_SECRET as string,
        ) as PayLoad;

        req.user_id = sub;

        const user = await prismaClient.user.findUnique({ where: { id: sub } })
        if (!user) return res.status(401).end();

        return next();
    } catch (error) {
        return res.status(401).end();
    }
}