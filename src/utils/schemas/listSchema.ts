import z from 'zod'

export const listSchema = z.object({
    id: z.number(),
    userId: z.number(),
    name: z.string().min(3).max(256),
    icon: z.string(),
    labels: z.number().array()
})

// CREATE LIST
export const createListSchema = listSchema.partial({
    id: true,
    labels: true,
})

export const createListValidate = (list: CreateListType) => {
    return createListSchema.safeParse(list)
}

export type CreateListType = z.infer<typeof createListSchema>

// EDIT NAME LIST
export const editNameListSchema = listSchema.partial({
    userId: true,
    icon: true,
    labels: true,
})

export const editNameListValidate = (list: EditNameListType) => {
    return editNameListSchema.safeParse(list)
}

export type EditNameListType = z.infer<typeof editNameListSchema>

// EDIT ICON LIST
export const editIconListSchema = listSchema.partial({
    userId: true,
    name: true,
    labels: true,
})

export const editIconListValidate = (list: EditIconListType) => {
    return editIconListSchema.safeParse(list)
}

export type EditIconListType = z.infer<typeof editIconListSchema>

export const editLabelListSchema = listSchema.partial({
    userId: true,
    name: true,
    icon: true,
})

export const editLabelListValidate = (list: EditLabelListType) => {
    return editLabelListSchema.safeParse(list)
}

export type EditLabelListType = z.infer<typeof editLabelListSchema>