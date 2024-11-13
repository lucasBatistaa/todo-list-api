import { NextFunction, Request, Response } from "express";
import { listModel } from "../../models/listModel";
import { ClientError } from "../../errors/clientError";

export default async function deleteList(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params

        if (!id) {
            return next(new ClientError('ID da lista não informado!'))
        }

        const deletedList = await listModel.delete(Number(id))

        if (!deletedList) {
            return next(new ClientError('Não foi possível deletar a lista!'))
        }

        res.status(200).json({
            message: 'Lista deletada!',
        })
    } catch (error) {
        next(error)
    }
};