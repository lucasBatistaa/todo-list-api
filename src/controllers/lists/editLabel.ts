import { NextFunction, Request, Response } from "express";
import { listModel } from "../../models/listModel";

export default async function editLabel(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params 
        const { labels } = req.body
        
        const editLabels = {
            id: Number(id),
            labels
        }

        const currentLabels = await listModel.getLabels(editLabels.id)

        const labelsToRemove = currentLabels.filter(label => label.labelId != editLabels.labels)

        await listModel.deleteLabels(editLabels.id, labelsToRemove)

        res.status(200).json({
            message: 'Etiquetas da lista atualizadas!',
        })
    } catch (error) {
        next(error)
    }
};
