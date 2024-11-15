import { prisma } from "../utils/prismaClient";
import { CreateTaskType } from "../utils/schemas/taskSchema";

export const taskModel = {
    create: async (taskData: CreateTaskType) => {
        const task = await prisma.task.create({
            data: taskData,
            select: {
                id: true, 
                name: true,
                priority: true,
                dateToComplete: true,
                isChecked: true, 
            }
        })

        return task
    },

    getAll: async (listId: number) => {
        const tasks = await prisma.task.findMany({
            where: {
                listId,
            }, 
            select: {
                id: true, 
                name: true,
                priority: true,
                dateToComplete: true,
                isChecked: true, 
            }
        })

        return tasks
    }
}