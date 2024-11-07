import { create } from 'domain'
import z from 'zod'

export const listSchema = z.object({
    id: z.number(),
    userId: z.number(),
    name: z.string().min(3).max(256),
    icon: z.string(),
    label: z.string().array(),
    task: z.string().array(),
})

export const createListSchema = listSchema.partial({
    id: true,
    icon: true,
    label: true,
    task: true,
})

export const createListValidate = (list: CreateListType) => {
    return createListSchema.safeParse(list)
}

export type CreateListType = z.infer<typeof createListSchema>