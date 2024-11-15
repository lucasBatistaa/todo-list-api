import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ClientError } from "../errors/clientError";
import { Prisma } from "@prisma/client";

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
	} else if (err instanceof Prisma.PrismaClientKnownRequestError) {
		res.status(400).json({
			message: `Erro na requisição ao banco de dados: ${err.message}`,
			code: err.code, 
		});
	} else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
		res.status(500).json({
			message: "Erro desconhecido ao acessar o banco de dados",
			error: err.message,
		});
	} else {
		res.status(500).json({
		message: "Erro interno no servidor",
		});
	}
}
