import { prisma } from "../utils/prismaClient";
import { CreateTaskType, EditDateTaskType, EditNameTaskType, EditPriorityTaskType } from "../utils/schemas/taskSchema";

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
    },

    updateName: async (taskData: EditNameTaskType) => {
        const task = await prisma.task.update({
            data: {
                name: taskData.name,
            },
            where: {
                id: taskData.id,
            },
            select: {
                id: true,
            }
        })

        return task
    },

    updateDateToComplete: async (taskData: EditDateTaskType) => {
        const task = await prisma.task.update({
            data: {
                dateToComplete: taskData.dateToComplete,
            }, 
            where: {
                id: taskData.id,
            },
            select: {
                id: true,
            }
        })

        return task
    },

    updateIsChecked: async (id: number) => {
        const isCheckedValue = await prisma.task.findUnique({
            where: {
                id,
            },
            select: {
                isChecked: true,
            }
        })


        const task = await prisma.task.update({
            data: {
                isChecked: !isCheckedValue?.isChecked,
            }, 
            where: {
                id,
            },
            select: {
                id: true,
            }
        })

        return task
    },

    updatePriority: async (taskData: EditPriorityTaskType) => {
        const task = await prisma.task.update({
            data: {
                priority: taskData.priority,
            }, 
            where: {
                id: taskData.id,
            },
            select: {
                id: true,
            }
        })

        return task
    },

    delete: async (id: number) => {
        const task = await prisma.task.delete({
            where: {
                id
            }, 
            select: {
                id: true,
            }
        })

        return task
    }
}