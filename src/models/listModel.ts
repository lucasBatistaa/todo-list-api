import { prisma } from "../utils/prismaClient"
import { CreateListType, EditNameListType } from "../utils/schemas/listSchema"

export const listModel = {
    create: async (dataList: CreateListType) => {
        const list = await prisma.list.create({
            data: dataList,
            select: {
                id: true,
            }
        })

        return list
    },

    getFavorites: async (userId: number) => {
        const favorites = await prisma.list.findMany({
            where: {
                userId,
                isFavorite: true
            }, 
            select: {
                id: true,
                icon: true,
                name: true,
            }
        })

        return favorites
    },

    getAll: async (userId: number) => {
        const lists = await prisma.list.findMany({
            where: {
                userId,
            }, 
            select: {
                id: true,
                icon: true,
                name: true,
            }
        })

        return lists
    },

    getLabels: async (listId: number) => {
        const labelsOnList = await prisma.labelOnList.findMany({
            where: {
                listId
            },
            select: {
                labelId: true,
            }
        })

        return labelsOnList
    },

    updateFavorite: async (id: number) => {
        const isFavorited = await prisma.list.findUnique({
            where: {
                id,
            },
            select: {
                isFavorite: true
            }
        })

        const list = await prisma.list.update({
            data: {
                isFavorite: !isFavorited?.isFavorite
            },
            where: {
                id,
            },
            select: {
                id: true,
            }
        })

        return list
    },

    updateName: async (listData: EditNameListType) => {
        const list = await prisma.list.update({
            data: {
                name: listData.name,
            },
            where: {
                id: listData.id,
            },
            select: {
                id: true,
                name: true,
            }
        })

        return list
    },

    updateIcon: async (listData) => {
        const list = await prisma.list.update({
            data: {
                icon: listData.icon,
            },
            where: {    
                id: listData.id,
            },
            select: {
                id: true,
            }
        })

        return list
    },

    delete: async (id: number) => {
        const list = await prisma.list.delete({
            where: {
                id
            }, 
            select: {
                id: true
            }
        })

        return list
    }
}