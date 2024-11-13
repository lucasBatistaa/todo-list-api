import { NextFunction, Request, Response } from "express";
import { listModel } from "../../models/listModel";
import { editLabelListValidate } from "../../utils/schemas/listSchema";

export default async function editLabel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { labels } = req.body;

    const editLabels = {
      id: Number(id),
      labels,
    };

    const validatedList = editLabelListValidate(editLabels);

    if (!validatedList.success) {
      return next(validatedList.error);
    }

    const currentLabels = await listModel.getLabels(validatedList.data.id);

    const labelsToRemove = currentLabels.filter(
      (label) => !validatedList.data.labels.includes(label)
    );

    const labelsToAdd = validatedList.data.labels.filter(
      (label) => !currentLabels.includes(label)
    );

    await listModel.updateLabels(editLabels.id, labelsToRemove, labelsToAdd);

    res.status(200).json({
      message: "Etiquetas da lista atualizadas!",
    });
  } catch (error) {
    next(error);
  }
}
