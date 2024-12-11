import { NextFunction, Request, Response } from "express";
import { ClientError } from "../../errors/clientError";
import { userModel } from "../../models/userModel";
import { createUserValidate } from "../../utils/schemas/userSchema";

import jwt from "jsonwebtoken";

import { env } from "../../utils/schemas/envSchema";
import { sessionModel } from "../../models/sessionModel";

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

    const token = jwt.sign(
      { publicId: createdUser.publicId, username: createdUser.username },
      env.SECRET_KEY,
      { expiresIn: "10min" }
    );

    await sessionModel.create(createdUser.id, token);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    
    res.status(200).json({
      message: "Usuário criado!",
      user: {
        id: createdUser.id,
        name: createdUser.username,
        photo: createdUser.photo,
        email: createdUser.email,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}
