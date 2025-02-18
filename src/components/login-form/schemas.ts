import z from "zod";

const emailSchema = z
  .string({ message: "Campo obrigatório" })
  .email({ message: "Email inválido" })
  .min(1, { message: "Campo obrigatório" });

export const loginFormSchema = z.discriminatedUnion("form_type", [
  z.object({
    form_type: z.literal("check-email"),
    email: emailSchema,
    password: z.string().optional(),
  }),
  z.object({
    form_type: z.literal("submit-credentials"),
    email: emailSchema,
    password: z
      .string({ message: "Campo obrigatório" })
      .min(1, { message: "Campo obrigatório" }),
  }),
]);

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
