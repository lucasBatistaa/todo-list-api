import { Request, Response } from "express";
import { createUserValidate } from "../../utils/userSchema";
import { error } from "console";

export default function createUser(req: Request, res: Response) {
    try {
        const user = req.body
        const userValidated = createUserValidate(user)

        if (userValidated.error) {
            res.status(400).json({
                message: 'Erro na validação de dados, verifique todos os campos!',
                error: userValidated.error.flatten().fieldErrors
            })
        }

    } catch (error) {
        console.log(error)
    }
};
