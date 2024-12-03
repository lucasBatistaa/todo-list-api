import { NextFunction, Request, Response } from "express";
import { ClientError } from "../../errors/clientError";

import { sessionModel } from "../../models/sessionModel";

export default async function loggedUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.authToken

    console.log('TOKEN: ', token)

    if (!token) {
      return next(new ClientError("Token não encontrado"));
    }

    const session = await sessionModel.getUserByToken(token);

    if (!session) {
        return next(new ClientError("Sessão não encontrada"));
    }

    const user = session.user

    res.status(200).json({
      message: "Usuário logado!",
      user: {
        id: user.id,
        name: user.username,
        photo: user.photo,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}
