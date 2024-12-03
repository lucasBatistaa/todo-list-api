import { NextFunction, Request, Response } from "express";
import { editNameLabelValidate } from "../../utils/schemas/labelSchema";
import { labelModel } from "../../models/labelModel";
import { ClientError } from "../../errors/clientError";

export default async function editNameLabel(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const { name } = req.body

        const label = { 
            id: Number(id),
            name
        }

        const validatedLabel = editNameLabelValidate(label)

        if (!validatedLabel.success) {
            return next(validatedLabel.error)
        }

        const editLabel = await labelModel.updateName(validatedLabel.data)

        if (!editLabel) {
            return next(new ClientError('Erro! Não foi possível atualizar o nome da etiqueta!'))
        }

        res.status(200).json({
            message: 'Nome da etiqueta atualizado!',
        })

    } catch (error) {
        next(error)
    }
};
