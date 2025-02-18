"use client";

import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import useCreatePassword from "./use-create-password-model";
import PasswordRuleItem from "./password-rule-item";

type Props = ReturnType<typeof useCreatePassword>;

export default function CreatePasswordFormView({
  form,
  onSubmit,
  error,
  password,
  confirmPassword,
  ...props
}: Props) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Criar senha</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Crie sua senha para fazer login
          </p>
        </div>
        <div className="grid gap-6">
          <div className="flex flex-col items-start">
            <PasswordRuleItem
              isValid={password ? password.length >= 8 : false}
              label="Mínimo de 8 caracteres"
            />
            <PasswordRuleItem
              isValid={props.hasCapitalLetter(password)}
              label="Mínimo de 1 letra maiúscula"
            />
            <PasswordRuleItem
              isValid={props.hasLetter(password)}
              label="Mínimo de 1 letra"
            />
            <PasswordRuleItem
              isValid={props.hasNumber(password)}
              label="Mínimo de 1 número"
            />
            <PasswordRuleItem
              isValid={props.hasSpecialChar(password)}
              label="Mínimo de 1 caracter especial (!@#$%^&*)"
            />
          </div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder="****" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input placeholder="****" {...field} />
                </FormControl>
                {confirmPassword !== password && (
                  <p className="text-sm text-red-500">
                    As senhas devem ser iguais
                  </p>
                )}
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2">
            <Button
              disabled={confirmPassword !== password}
              type="submit"
              className="w-full"
              isLoading={form.formState.isSubmitting}
            >
              Criar senha e entrar
            </Button>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        </div>
      </form>
    </Form>
  );
}
