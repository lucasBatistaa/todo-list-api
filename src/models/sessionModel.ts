import { prisma } from "../utils/prismaClient"

export const sessionModel = {
    create: async (userId: number, token: string) => {
        await prisma.session.create({
            data: {
                userId,
                token
            }
        })
    }
}