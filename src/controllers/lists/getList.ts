import { NextFunction, Request, Response } from "express";
import { listModel } from "../../models/listModel";
import { ClientError } from "../../errors/clientError";

export default async function getList(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        
        if (!id) {
            return next(new ClientError('ID da lista não informado!'))
        }
    
        const list = await listModel.getList(Number(id))

        res.status(200).json({
            message: 'Lista!',
            list
        })

    } catch (error) {
        next(error)
    }
};
