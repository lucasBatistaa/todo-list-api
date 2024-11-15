import { NextFunction, Request, Response } from "express";

import { ClientError } from "../../errors/clientError";
import { loginUserValidate } from "../../utils/schemas/userSchema";
import { userModel } from "../../models/userModel";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { env } from "../../utils/schemas/envSchema";
import { sessionModel } from "../../models/sessionModel";

export default async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const login = req.body;
    const loginValidated = loginUserValidate(login);

    if (!loginValidated.success) {
      return next(loginValidated.error);
    }

    const user = await userModel.getByEmail(loginValidated.data.email);

    if (!user) {
      return next(new ClientError("E-mail e/ou senha incorreto(s)!"));
    }

    const passwordIsValid = await bcrypt.compare(
      loginValidated.data.password,
      user.password
    );

    if (!passwordIsValid) {
      return next(new ClientError("E-mail e/ou senha incorreto(s)!"));
    }

    const token = jwt.sign(
      { publicId: user.publicId, username: user.username },
      env.SECRET_KEY,
      { expiresIn: "1min" }
    );

    await sessionModel.create(user.id, token)

    res.status(200).json({
      message: "Login realizado!",
      token,
    });
  } catch (error) {
    next(error);
  }
}
