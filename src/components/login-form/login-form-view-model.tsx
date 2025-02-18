"use client";
import LoginFormView from "./login-form-view";
import useLoginFormModel from "./use-login-form-model";

export default function LoginFormViewModel() {
  const model = useLoginFormModel();

  return <LoginFormView {...model} />;
}
