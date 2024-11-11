import { NextFunction, Request, Response } from "express";
import { ClientError } from "../../errors/clientError";
import { listModel } from "../../models/listModel";

export default async function allLists(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.body  

        if (!userId) {
            return next(new ClientError('ID do usuário não informado!'))
        }

        const lists = await listModel.getAll(userId)

        res.status(200).json({
            message: 'Todas as listas!',
            lists
        })
    } catch (error) {
        next(error)
    }
};
