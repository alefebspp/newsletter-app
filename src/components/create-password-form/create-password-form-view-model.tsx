"use client";

import CreatePasswordFormView from "./create-password-form-view";
import useCreatePassword from "./use-create-password-model";

type Props = {
  email: string;
};

export default function CreatePasswordFormViewModel({ email }: Props) {
  const model = useCreatePassword({ email });

  return <CreatePasswordFormView {...model} />;
}
