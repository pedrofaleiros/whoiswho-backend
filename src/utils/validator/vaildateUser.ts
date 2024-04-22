import { UserModel } from "../../model/UserModel";
import { ValidationError } from "../errors";

export default function validateUser(user: UserModel) {
    if (!validateUsername(user.username))
        throw new ValidationError('Username inválido.');
    if (!validatePassword(user.password))
        throw new ValidationError('Senha inválida.');
}

function validateUsername(username: any): boolean {
    if (typeof username !== 'string' || username.length < 3 || username.length > 64) {
        return false;
    }
    return true;
}

function validatePassword(password: any): boolean {
    if (typeof password !== 'string') return false;
    if (password.length < 8 || password.length > 64) return false;
    if (!/\d/.test(password)) return false;
    if (!/[a-zA-Z]/.test(password)) return false;

    const specialCharacters = /[ !@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialCharacters.test(password)) return false;
    if (/\s/.test(password)) return false;
    return true;
}