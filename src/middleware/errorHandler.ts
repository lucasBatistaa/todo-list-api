import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ClientError } from "../errors/clientError";

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            message: 'Erro na validação de dados!',
            error: err.flatten().fieldErrors
        })
    }

    if (err instanceof ClientError) {
        return res.status(400).json({
            message: err.message
        })
    }

    return res.status(500).json({
        message: 'Erro interno no servidor'
    })
}