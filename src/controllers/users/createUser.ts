import { NextFunction, Request, Response } from "express";
import { ClientError } from "../../errors/clientError";
import { userModel } from "../../models/userModel";
import { createUserValidate } from "../../utils/schemas/userSchema";

import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export default async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.body;
    const userValidated = createUserValidate(user);

    if (!userValidated.success) {
      return next(userValidated.error);
    }

    const usernameExists = await userModel.usernameExists(
      userValidated.data.username
    );

    if (usernameExists) {
      return next(new ClientError("Nome de usuário já existe!"));
    }

    const emailExists = await userModel.emailExists(userValidated.data.email);

    if (emailExists) {
      return next(new ClientError("Já existe um usuário com este e-mail!"));
    }

    userValidated.data.publicId = uuid();
    userValidated.data.password = bcrypt.hashSync(
      userValidated.data.password,
      10
    );

    const createdUser = await userModel.create(userValidated.data);

    if (!createdUser) {
      return next(new ClientError("Erro na criação do usuário"));
    }

    return res.status(200).json({
      message: "Usuário criado!",
      user: createdUser,
    });
  } catch (error) {
    next(error);
  }
}
