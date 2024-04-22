import { compare } from "bcryptjs";
import { UsecaseError } from "./errors";

export async function verifyPassword(authPassword: string, databasePassword: string) {
    const passwordMatches = await compare(authPassword, databasePassword)
    if (!passwordMatches) {
        throw new UsecaseError('Senha incorreta.');
    }
}