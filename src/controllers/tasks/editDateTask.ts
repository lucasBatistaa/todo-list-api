import { NextFunction, Request, Response } from "express";
import { taskModel } from "../../models/taskModel";
import { ClientError } from "../../errors/clientError";
import { editDateTaskValidate } from "../../utils/schemas/taskSchema";

export default async function editDateTask(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const { date } = req.body

        const task = {
            id: Number(id),
            dateToComplete: new Date(date)
        }

        const validatedTask = editDateTaskValidate(task)

        if (!validatedTask.success) {
            return next(validatedTask.error)
        }

        // Fix: Validar sem comparar horários
        if (validatedTask.data.dateToComplete < new Date()) {
            return next(new ClientError('Data informada é anterior ao dia de hoje!'))
        }

        const editedTask = await taskModel.updateDateToComplete(validatedTask.data)

        if (!editedTask) {
            return next(new ClientError('Não foi possível atualizar a data da tarefa!'))
        }
        
        res.status(200).json({
            message: 'Data da tarefa atualizada!',
        })
    } catch (error) {
        next(error)
    }
};
