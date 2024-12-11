import { NextFunction, Request, Response } from "express";
import { CreateTaskType, createTaskValidate } from "../../utils/schemas/taskSchema";
import { taskModel } from "../../models/taskModel";
import { ClientError } from "../../errors/clientError";

export default async function createTask(req: Request, res: Response, next: NextFunction) {
    try {
        const {listId, name, dateToComplete, priority} = req.body

        const task: CreateTaskType = {
            listId: Number(listId),
            name: String(name),
            dateToComplete: dateToComplete?  new Date(dateToComplete) : null,
            priority: priority !== null ? Number(priority) : null,
          };

        const validatedTask = createTaskValidate(task)

        if (!validatedTask.success) {
            return next(validatedTask.error)
        }

        const createdTask = await taskModel.create(validatedTask.data)

        if (!createdTask) {
            return next(new ClientError('Erro! Não foi possível criar a tarefa!'))
        }

        res.status(200).json({
            message: 'Tarefa criada!',
            task: createdTask
        })
    } catch (error) {
        next(error)
    }
};
