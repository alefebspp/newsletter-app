"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginFormSchema, loginFormSchema } from "./schemas";
import { login } from "@/services/auth";
import { useUserContext } from "@/context/user.context";
import { useRouter } from "next/navigation";

export default function useLoginFormModel() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [userEmail, setUserEmail] = useState<string>();
  const [error, setError] = useState<string>();

  const { setUser } = useUserContext();
  const router = useRouter();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      form_type: "check-email",
    },
  });

  async function onSubmit(values: LoginFormSchema) {
    if (error) {
      setError("");
    }

    if (!userEmail) {
      const { shouldCreatePassword, error } = await login({ ...values });

      if (error) {
        return setError(error.message);
      }

      if (shouldCreatePassword) {
        setShowPasswordForm(true);
        return setUserEmail(values.email);
      } else {
        form.setValue("form_type", "submit-credentials");
        return setUserEmail(values.email);
      }
    }

    const response = await login({ ...values });

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
    userEmail,
    showPasswordForm,
  };
}
