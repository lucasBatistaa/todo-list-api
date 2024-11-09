import { Request, Response } from "express";
import { createUserValidate } from "../../utils/userSchema";
import { userModel } from "../../models/userModel";

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

        const createdUser  = await userModel.create(userValidated.data)

        return res.status(200).json({
            message: 'User created!',
            user: createdUser
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        })
    }
};
