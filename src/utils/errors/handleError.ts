import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResourceNotFoundError, UsecaseError, ValidationError } from ".";

export function handleError() {
    return (error: Error, _: Request, res: Response, __: NextFunction) => {

        if (error instanceof ValidationError) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message
            })
        }

        if (error instanceof UsecaseError) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message
            })
        }

        if (error instanceof ResourceNotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: error.message
            })
        }

        // if (error instanceof NotAuthError) {
        //     return res.sendStatus(StatusCodes.UNAUTHORIZED)
        // }

        if (error instanceof SyntaxError) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                message: error.message
            })
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Erro inesperado.",
            error: `${error.name}: ${error.message}`
        });
    };
}