import { NextFunction, Request, Response } from "express";
import { ClientError } from "../errors/clientError";
import { sessionModel } from "../models/sessionModel";

import jwt, { TokenExpiredError } from "jsonwebtoken";
import { env } from "../utils/schemas/envSchema";

export default async function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.authToken

    if (!token) {
      return res.status(200).json({
        user: null
      })
      // return next(new ClientError("Token não identificado!"));
    }

    try {
      jwt.verify(token, env.SECRET_KEY);

      
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        const token = req.cookies.authToken

        if (!token) {
          return next(new ClientError("Token não identificado!"));
        }

        const session = await sessionModel.getUserByToken(token);

        if (session) {
          const newToken = jwt.sign(
            {
              publicId: session?.user.publicId,
              username: session?.user.username,
            },
            env.SECRET_KEY,
            { expiresIn: "1min" }
          );

          const sessionWithNewToken = await sessionModel.updateToken(
            session.id,
            newToken
          );

          if (!sessionWithNewToken) {
            return next(new ClientError("Erro! Não foi possível atualizar o token!"));
          }

          res.cookie("authToken", newToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 5 * 60 * 1000,
          });

          req.cookies.authToken = newToken
          next()

        }
      } else {
        // return next(new ClientError("Sessão não encontrada!"));

        return res.status(200).json({
          user: null
        })
      }
    }

    const session = await sessionModel.getByToken(token);

    if (!session) {
      return res.status(200).json({
        user: null
      });
    }

    next()
  } catch (error) {
    next(error)
  }
}
