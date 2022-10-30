import z from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8)
});

export const createUserOutputSchema = z.object({
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    role: z.string(),
    password: z.string(), // This is not a good idea to return the password, but for this example it's fine
    token: z.string()
  })
});

export const verifyUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;
