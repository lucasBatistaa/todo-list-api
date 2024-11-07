import { Request, Response } from "express";
import { CreateListType, createListValidate } from "../../utils/listSchema";

export default async function createList(req: Request, res: Response) {
    try {
        const data = req.body

        const validatedData = createListValidate(data)

        if (validatedData.error) {
            return res.status(400).json({
                message: 'Erro na criação da lista, verifique todos os dados!',
                error: validatedData.error.flatten().fieldErrors,
            })
        } 

        return res.status(200).json({
            message: 'Created list!',
            list: validatedData.data
        })

    } catch (error) {
        console.error('error: ', error)        
    }
};
