import { z } from "zod";

export const taskSchema = z.object({
    id: z.number(),
    listId: z.number(),
    name: z.string().min(3).max(256),
    isCheched: z.boolean(),
    priority: z.number(),
    dateToComplete: z.date()
})

// CREATE TASK
export const createTaskSchema = taskSchema.partial({
    id: true,
    isCheched: true,
    // priority: true,
    dateToComplete: true
})

export const createTaskValidate = (task: CreateTaskType) => {
    return createTaskSchema.safeParse(task)
}

export type CreateTaskType = z.infer<typeof createTaskSchema>