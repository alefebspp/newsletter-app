"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { CreatePasswordSchema, createPasswordSchema } from "./schema";
import { login } from "@/services/auth";
import { useUserContext } from "@/context/user.context";

type Props = {
  email: string;
};

export default function useCreatePassword({ email }: Props) {
  const [error, setError] = useState<string>();

  const { setUser } = useUserContext();
  const router = useRouter();

  const form = useForm<CreatePasswordSchema>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const password = form.watch("password");
  const confirmPassword = form.watch("confirm_password");

  function hasCapitalLetter(password: string) {
    return /[A-Z]/.test(password);
  }

  function hasLetter(password: string) {
    return /[a-z]/.test(password);
  }

  function hasNumber(password: string) {
    return /[0-9]/.test(password);
  }

  function hasSpecialChar(password: string) {
    return /[!@#$%^&*]/.test(password);
  }

  async function onSubmit({ password }: CreatePasswordSchema) {
    if (error) {
      setError("");
    }

    const response = await login({ email, password });

    if (response.error) {
      return setError(response.error.message);
    }

    if (response.user) {
      setUser(response.user);
      router.push("dashboard");
    }
  }

  return {
    form,
    onSubmit,
    error,
    password,
    confirmPassword,
    hasCapitalLetter,
    hasLetter,
    hasNumber,
    hasSpecialChar,
  };
}
