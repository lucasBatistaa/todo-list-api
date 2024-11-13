import { NextFunction, Request, Response } from "express";
import { listModel } from "../../models/listModel";
import { ClientError } from "../../errors/clientError";
import { editNameListValidate } from "../../utils/schemas/listSchema";

export default async function editNameList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const list = {
      id: Number(id),
      name: String(name),
    };

    const validatedList = editNameListValidate(list);

    if (!validatedList.success) {
      return next(validatedList.error);
    }

    const updatedList = await listModel.updateName(validatedList.data);

    if (!updatedList) {
      return next(new ClientError("Erro! Não foi possível atualizar a lista!"));
    }

    res.status(200).json({
      message: "Nome da lista atualizado!",
    });
  } catch (error) {
    next(error);
  }
}
