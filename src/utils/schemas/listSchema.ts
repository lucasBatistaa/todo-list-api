import z from 'zod'

export const listSchema = z.object({
    id: z.number(),
    userId: z.number(),
    name: z.string().min(3).max(256),
    icon: z.string(),
    // labels: z.number().
})

export const createListSchema = listSchema.partial({
    id: true,
})

export const createListValidate = (list: CreateListType) => {
    return createListSchema.safeParse(list)
}

export type CreateListType = z.infer<typeof createListSchema>

export const editNameListSchema = listSchema.partial({
    userId: true,
    icon: true,
})

export const editNameListValidate = (list: EditNameListType) => {
    return editNameListSchema.safeParse(list)
}

export type EditNameListType = z.infer<typeof editNameListSchema>

// export const editLabelListSchema = listSchema.partial({
//     userId: true,
//     name: true,
//     icon: true,
// })