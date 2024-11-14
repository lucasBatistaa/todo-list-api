import { prisma } from "../utils/prismaClient"
import { CreateLabelType, EditNameLabelType } from "../utils/schemas/labelSchema"

export const labelModel = {
    create: async (labelData: CreateLabelType) => {
        const label = await prisma.label.create({
            data: labelData,
            select: {
                id: true,
                name: true,
            }
        })

        return label
    }, 

    getAll: async (userId: number) => {
        const labels = await prisma.label.findMany({
            where: {
                userId: userId,
            },
            select: {
                id: true,
                name: true,
            }
        })

        return labels
    }, 

    updateName: async (labelData: EditNameLabelType) => {
        const label = await prisma.label.update({
            data: {
                name: labelData.name,
            },
            where: {
                id: labelData.id,
            }, 
            select: {
                id: true,
            }
        })

        return label
    }, 

    delete: async (id: number) => {
        const label = await prisma.label.delete({
            where: {
                id
            }, 
            select: {
                id: true
            }
        })

        return label
    }, 

    // deleteRelation: async (id: number, listId: number) => {
    //     await prisma.labelOnList.delete({
    //         where: {
    //             labelId: id,
    //             listId,
    //         }
    //     })
    // },

    deleteAllRelations: async (id: number) => {
        await prisma.labelOnList.deleteMany({
            where: {
                labelId: id,
            }
        })
    }
}