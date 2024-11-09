import { NextFunction, Request, Response } from "express";
import { sessionModel } from "../../models/sessionModel";
import { ClientError } from "../../errors/clientError";

export default async function logout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return next(new ClientError("Token não encontrado"));
    }

    await sessionModel.deleteByToken(token);

    res.json("Deslogado com sucesso!");
  } catch (error) {
    next(error);
  }
}