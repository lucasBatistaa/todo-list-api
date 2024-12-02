import { NextFunction, Request, Response } from "express";
import { taskModel } from "../../models/taskModel";
import { ClientError } from "../../errors/clientError";

export default async function editIsCheckedTask(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params

        if (!id) {
            return next(new ClientError('ID da tarefa não informado!'))
        }

        const editedTask = await taskModel.updateIsChecked(Number(id))

        if (!editedTask) {
            return next(new ClientError('Não foi possível atualizar o status da tarefa!'))
        }
        
        res.status(200).json({
            message: 'Status da tarefa atualizado!',
        })
    } catch (error) {
        next(error)
    }
};
