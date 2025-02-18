import z from "zod";

const passwordSchema = z
  .string({ message: "Campo obrigatório" })
  .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "A senha deve ter pelo menos 1 caracter maiúsculo",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "A senha deve ter pelo menos 1 caracter minúsculo",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "A senha deve ter pelo menos 1 número",
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "A senha deve ter pelo menos um caracter especial (!@#$%^&*)",
  });

export const createPasswordSchema = z
  .object({
    password: passwordSchema,
    confirm_password: z
      .string({ message: "Campo obrigatório" })
      .min(1, { message: "Campo obrigatório" }),
  })
  .superRefine((val, ctx) => {
    if (val.confirm_password !== val.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "As senhas devem ser iguais",
        path: ["confirm_password"],
      });
    }
  });

export type CreatePasswordSchema = z.infer<typeof createPasswordSchema>;
