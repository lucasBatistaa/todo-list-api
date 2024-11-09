import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  publicId: z.string(),
  username: z.string().min(3).max(256),
  email: z.string().email(),
  password: z.string().min(8).max(256),
  photo: z.string(),
});

const createUserSchema = userSchema.partial({
  id: true,
  publicId: true,
  photo: true,
});

export type createUserType = z.infer<typeof createUserSchema>;

export const createUserValidate = (user: createUserType) => {
  return createUserSchema.safeParse(user);
};

const loginUserSchema = userSchema.partial({
  id: true,
  publicId: true,
  username: true,
  photo: true,
});

type loginUserType = z.infer<typeof loginUserSchema>;

export const loginUserValidate = (user: loginUserType) => {
  return loginUserSchema.safeParse(user);
};