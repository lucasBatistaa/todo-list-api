import { Request, Response } from "express";
import { createListValidate } from "../../utils/listSchema";

export default async function createList(req: Request, res: Response) {
    try {
        const data = req.body

        // Validar dados (req.body)
        const validatedData = createListValidate(data)

        if (validatedData.error) {
            return res.status(400).json({
                message: 'Erro na criação da lista, verifique todos os dados!',
                error: validatedData.error.flatten().fieldErrors,
            })
        } 

        // Verificar se usuário existe
        // const userExists = 

        // Verificar se labels existem

        return res.status(200).json({
            message: 'Created list!',
            list: validatedData.data
        })

    } catch (error) {
        console.error('error: ', error)        
    }
};
