import { prisma } from "../utils/prismaClient"
import { CreateListType } from "../utils/schemas/listSchema"

export const listModel = {
    create: async (dataList: CreateListType) => {
        const list = await prisma.list.create({
            data: dataList, 
            select: {
                id: true,
            }
        })

        return list
    }
}