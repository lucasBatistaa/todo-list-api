import { prisma } from "../utils/prismaClient"
import { createUserType } from "../utils/schemas/userSchema"

export const userModel = {
    create: async (userData: createUserType) => {
        const user = await prisma.user.create({
            data: userData,
            select: {
                id: true,
                username: true,
                email: true,
                photo: true,
            }
        })  

        return user
    },

    usernameExists: async (username: string) => {
        const user = await prisma.user.findUnique({
            where: {
                username
            }, 
            select: {
                id: true,
            }
        })

        return user
    },

    emailExists: async (email: string) => {
        const user = await prisma.user.findUnique({
            where: {
                email
            }, 
            select: {
                id: true,
            }
        })

        return user
    },

    getByEmail: async (email: string) => {
        const user = await prisma.user.findUnique({
            where: {
                email
            }, 
            select: {
                id: true,
                publicId: true,
                username: true,
                email: true,
                password: true,
            }
        })

        return user
    },
}