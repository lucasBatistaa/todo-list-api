import { NextFunction, Request, Response } from "express";
import { taskModel } from "../../models/taskModel";
import { ClientError } from "../../errors/clientError";
import { editNameTaskValidate } from "../../utils/schemas/taskSchema";

export default async function editNameTask(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const { name } = req.body

        const task = {
            id: Number(id),
            name
        }

        const validatedTask = editNameTaskValidate(task)

        if (!validatedTask.success) {
            return next(validatedTask.error)
        }

        const editedTask = await taskModel.updateName(validatedTask.data)

        if (!editedTask) {
            return next(new ClientError('Não foi possível atualizar o nome da tarefa!'))
        }
        
        res.status(200).json({
            message: 'Nome da tarefa atualizado!',
        })
    } catch (error) {
        next(error)
    }
};
