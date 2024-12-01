import { NextFunction, Request, Response } from "express";
import { createListValidate } from "../../utils/schemas/listSchema";
import { listModel } from "../../models/listModel";
import { ClientError } from "../../errors/clientError";

export default async function createList(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body
        const validatedData = createListValidate(data)

        if (!validatedData.success) {
            return next(validatedData.error)
        } 

        const listId = await listModel.create(validatedData.data)

        if (!listId) {
            return next(new ClientError('Erro na criação da lista!'))
        }

        res.status(200).json({
            message: 'Lista criada!',
            listId
        })

    } catch (error) {
        next(error)       
    }
};
