import { PrismaClient } from "@prisma/client"
import { createUserType } from "../utils/userSchema"

export const prisma = new PrismaClient()

export const userModel = {
    create: async (userData: createUserType) => {
        const user = prisma.user.create({
            data: userData,
            select: {
                id: true,
                username: true,
                email: true,
                photo: true,
            }
        })  

        return user
    }
}