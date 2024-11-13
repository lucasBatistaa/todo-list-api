import { NextFunction, Request, Response } from "express";
import { ClientError } from "../../errors/clientError";
import { listModel } from "../../models/listModel";

export default async function editFavorite(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params

        if (!id) {
            return next(new ClientError('ID da lista não informado!'))
        }

        const editFavorite = await listModel.updateFavorite(Number(id))
        
        if (!editFavorite) {
            return next(new ClientError('Erro! Não foi possível atualizar a lista!'))
        }

        res.status(200).json({
            message: 'Lista atualizada!',
        })

    } catch (error) {
        next(error)
    }
};
