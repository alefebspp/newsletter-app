"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CreatePasswordFormViewModel from "../create-password-form/create-password-form-view-model";

import useLoginFormModel from "./use-login-form-model";

type Props = ReturnType<typeof useLoginFormModel>;

export default function LoginFormView({
  form,
  onSubmit,
  error,
  userEmail,
  showPasswordForm,
}: Props) {
  if (userEmail && showPasswordForm) {
    return <CreatePasswordFormViewModel email={userEmail} />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Fazer login</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Entre com seu email abaixo para fazer login em sua conta
          </p>
        </div>
        <div className="grid gap-6">
          {!userEmail ? (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Senha</FormLabel>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Esqueceu a senha?
                      </a>
                    </div>
                    <FormControl>
                      <Input placeholder="****" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button
              isLoading={form.formState.isSubmitting}
              type="submit"
              className="w-full"
            >
              Entrar
            </Button>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        </div>
      </form>
    </Form>
  );
}
