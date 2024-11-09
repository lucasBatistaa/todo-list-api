import { z } from "zod";

export const userSchema = z.object({
    id: z.number().positive(),
    publicId: z.string(),
    username: z.string().min(3).max(256),
    email: z.string().email(),
    password: z.string().min(8).max(256), 
    photo: z.string(),
})

export const createUserSchema = userSchema.partial({
    id: true,
    publicId: true, 
    photo: true,
})

export const createUserValidate = (user: createUserType) => {
    return createUserSchema.safeParse(user)
}

export type createUserType = z.infer<typeof createUserSchema>