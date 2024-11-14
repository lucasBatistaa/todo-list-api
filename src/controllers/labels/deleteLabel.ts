import { NextFunction, Request, Response } from "express";
import { labelModel } from "../../models/labelModel";
import { ClientError } from "../../errors/clientError";

export default async function deleteLabel(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params

        if (!id) {
            return next(new ClientError('ID da etiqueta não informado!'))
        }

        const deletedLabel = await labelModel.delete(Number(id))

        await labelModel.deleteAllRelations(Number(id))

        if (!deletedLabel) {
            return next(new ClientError('Não foi possível excluir a etiqueta!'))
        }

        res.status(200).json({
            message: 'Etiqueta excluída!'
        })
    } catch (error) {
        next(error)
    }
};
