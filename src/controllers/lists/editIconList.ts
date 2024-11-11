import { NextFunction, Request, Response } from "express";
import { listModel } from "../../models/listModel";
import { ClientError } from "../../errors/clientError";

export default async function editIconList(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const {icon} = req.body

        const listData = {
            id: Number(id),
            icon: String(icon)
        }

        console.log(listData)

        const editedList = await listModel.updateIcon(listData)

        if (!editedList) {
            return next(new ClientError('Erro! Não foi possível atualizar o ícone!'))
        }

        res.status(200).json({
            message: 'Ícone da lista atualizado!',
        })
    } catch (error) {
        next(error)
    }
}