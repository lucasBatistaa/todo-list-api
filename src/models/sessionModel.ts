import { prisma } from "../utils/prismaClient"

export const sessionModel = {
    create: async (userId: number, token: string) => {
        await prisma.session.create({
            data: {
                userId,
                token
            }
        })
    },

    getByToken: async (token: string) => {
        const session = await prisma.session.findUnique({
            where: {
                token
            }, 
            select: {
                userId: true
            }
        })

        return session
    },

    deleteByToken: async (token: string) => {
        await prisma.session.delete({
            where: {
                token
            }
        })
    }
}