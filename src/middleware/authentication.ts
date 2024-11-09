import { NextFunction, Request, Response } from "express";
import { ClientError } from "../errors/clientError";
import { sessionModel } from "../models/sessionModel";

import jwt from "jsonwebtoken";
import { env } from "../utils/schemas/envSchema";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return next(new ClientError("Token não identificado!"));
    }

    const decoded = jwt.verify(token, env.SECRET_KEY);
    
    const session = await sessionModel.getByToken(token);

    if (!session) {
      return next(new ClientError("Sessão não encontrada!"));
    }

    next();
  } catch (error) {
    return next(new ClientError("Token inválido ou expirado!"));
  }
}
