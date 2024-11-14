import { z } from "zod";

export const labelSchema = z.object({
    id: z.number(),
    userId: z.number(),
    name: z.string().min(1).max(256),
})

// CREATE LABEL

export const createLabelSchema = labelSchema.partial({
    id: true,
})

export const createLabelValidate = (label: CreateLabelType) => {
    return createLabelSchema.safeParse(label)
}

export type CreateLabelType = z.infer<typeof createLabelSchema>

// EDIT NAME 

export const editNameLabelSchema = labelSchema.partial({
    userId: true
})

export const editNameLabelValidate = (label: EditNameLabelType) => {
    return editNameLabelSchema.safeParse(label)
}

export type EditNameLabelType = z.infer<typeof editNameLabelSchema>