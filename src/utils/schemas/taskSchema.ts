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
    dateToComplete: true
})

export const createTaskValidate = (task: CreateTaskType) => {
    return createTaskSchema.safeParse(task)
}

export type CreateTaskType = z.infer<typeof createTaskSchema>

// EDIT NAME
export const editNameTaskSchema = taskSchema.partial({
    listId: true,
    isCheched: true,
    priority: true,
    dateToComplete: true,
})

export const editNameTaskValidate = (task: EditNameTaskType) => {
    return editNameTaskSchema.safeParse(task)
}

export type EditNameTaskType = z.infer<typeof editNameTaskSchema>

// EDIT DATE
export const editDateTaskSchema = taskSchema.partial({
    listId: true,
    name: true,
    isCheched: true,
    priority: true,
})

export const editDateTaskValidate = (task: EditDateTaskType) => {
    return editDateTaskSchema.safeParse(task)
}

export type EditDateTaskType = z.infer<typeof editDateTaskSchema>

// EDIT PRIORITY
export const editPriorityTaskSchema = taskSchema.partial({
    listId: true,
    name: true,
    isCheched: true,
    dateToComplete: true,
})

export const editPriorityTaskValidate = (task: EditPriorityTaskType) => {
    return editPriorityTaskSchema.safeParse(task)
}

export type EditPriorityTaskType = z.infer<typeof editPriorityTaskSchema>