import { NextFunction, Request, Response } from "express";
import { taskModel } from "../../models/taskModel";
import { ClientError } from "../../errors/clientError";

export default async function deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params

        if (!id) {
            return next(new ClientError('ID da tarefa não informado!'))
        }

        const deletedTask = await taskModel.delete(Number(id))

        if (!deletedTask) {
            return next(new ClientError('Não foi possível deletar a tarefa!'))
        }
        
        res.status(200).json({
            message: 'Tarefa excluída!',
        })
    } catch (error) {
        next(error)
    }
};
