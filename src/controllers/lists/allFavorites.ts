import { NextFunction, Request, Response } from "express";
import { listModel } from "../../models/listModel";
import { ClientError } from "../../errors/clientError";

export default async function allFavorites(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.body
        
        if (!userId) {
            return next(new ClientError('ID do usuário não informado!'))
        }
    
        const favoritesLists = await listModel.getFavorites(userId)

        res.status(200).json({
            message: 'Listas favoritadas!',
            lists: favoritesLists
        })
    } catch (error) {
        next(error)
    }
};
