import { NextFunction, Request, Response } from "express";
import { taskModel } from "../../models/taskModel";
import { ClientError } from "../../errors/clientError";

export default async function allTasks(req: Request, res: Response, next: NextFunction) {
    try {
        const { listId } = req.params

        if (!listId) {
            return next(new ClientError('ID da lista não informado!'))
        }

        const tasks = await taskModel.getAll(Number(listId))

        res.status(200).json({
            message: 'Todas as tarefas!',
            tasks
        })
    } catch (error) {
        next(error)
    }
};
