import { NextFunction, Request, Response } from "express";
import { taskModel } from "../../models/taskModel";
import { ClientError } from "../../errors/clientError";
import { editPriorityTaskValidate } from "../../utils/schemas/taskSchema";

export default async function editPriorityTask(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const { priority } = req.body

        const task = {
            id: Number(id),
            priority: Number(priority)
        }

        const validatedTask = editPriorityTaskValidate(task)

        if (!validatedTask.success) {
            return next(validatedTask.error)
        }

        const editedTask = await taskModel.updatePriority(validatedTask.data)

        if (!editedTask) {
            return next(new ClientError('Não foi possível atualizar a prioridade da tarefa!'))
        }
        
        res.status(200).json({
            message: 'Prioridade da tarefa atualizada!',
        })
    } catch (error) {
        next(error)
    }
};
