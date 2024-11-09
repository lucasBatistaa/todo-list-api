import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ClientError } from "../errors/clientError";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Erro na validação de dados!",
      error: err.flatten().fieldErrors,
    });
  } else if (err instanceof ClientError) {
    res.status(400).json({
      message: err.message,
    });
  } else {
    res.status(500).json({
      message: "Erro interno no servidor",
    });
  }
}
