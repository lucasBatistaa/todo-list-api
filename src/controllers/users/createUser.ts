import { Request, Response } from "express";
import { createUserValidate } from "../../utils/userSchema";
import { userModel } from "../../models/userModel";

import { v4 as uuid }  from 'uuid'
import bcrypt from 'bcrypt'

export default async function createUser(req: Request, res: Response) {
    try {
        const user = req.body
        const userValidated = createUserValidate(user)

        if (userValidated.error) {
            return res.status(400).json({
                message: 'Erro na validação de dados, verifique todos os campos!',
                error: userValidated.error.flatten().fieldErrors
            })
        }

        const usernameExists = await userModel.usernameExists(userValidated.data.username)

        if (usernameExists) {
            res.status(400).json({
                message: 'Erro! Já existe um usuário com este username!',
            })
        }

        const emailExists = await userModel.emailExists(userValidated.data.email)

        if (emailExists) {
            res.status(400).json({
                message: 'Erro! Já existe um usuário com este e-mail!',
            })
        }

        userValidated.data.publicId = uuid()
        userValidated.data.password = bcrypt.hashSync(userValidated.data.password, 10)

        const createdUser  = await userModel.create(userValidated.data)

        if (!createdUser) {
            res.status(400).json({
                message: 'Erro na criação do usuário!',
            })
        }

        return res.status(200).json({
            message: 'Usuário criado!',
            user: createdUser
        })

    } catch (error) {
        return res.status(500).json({
            message: "Erro no servidor"
        })
    }
};
