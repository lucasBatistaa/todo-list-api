import { NextFunction, Request, Response } from "express";
import { createLabelValidate } from "../../utils/schemas/labelSchema";
import { labelModel } from "../../models/labelModel";
import { ClientError } from "../../errors/clientError";

export default async function createLabel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const label = req.body;

    const validatedLabel = createLabelValidate(label);

    if (!validatedLabel.success) {
      return next(validatedLabel.error);
    }

    const createdLabel = await labelModel.create(validatedLabel.data);

    if (!createdLabel) {
      return next(new ClientError("Erro ao criar a etiqueta!"));
    }

    res.status(200).json({
      message: "Etiqueta criada!",
      createdLabel,
    });
  } catch (error) {
    next(error);
  }
}
