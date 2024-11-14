import { NextFunction, Request, Response } from "express";
import { ClientError } from "../../errors/clientError";
import { labelModel } from "../../models/labelModel";

export default async function allLabels(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params  

        if (!userId) {
            return next(new ClientError('ID do usuário não informado!'))
        }

        const labels = await labelModel.getAll(Number(userId))
        
        res.status(200).json({
            message: 'Todas as etiquetas!',
            labels
        })
    } catch (error) {
        next(error)
    }
};
