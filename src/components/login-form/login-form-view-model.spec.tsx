import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginFormView from "./login-form-view";
import useLoginFormModel from "./use-login-form-model";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

function Sut({
  methods,
}: {
  methods?: Partial<ReturnType<typeof useLoginFormModel>>;
}) {
  const values = useLoginFormModel();

  return <LoginFormView {...{ ...values, ...methods }} />;
}

describe("<LoginFormViewModel />", () => {
  it("should render a email input and a submit button", () => {
    render(<Sut />);

    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByText("Entrar");

    expect(emailInput).toBeVisible();
    expect(submitButton).toBeVisible();
  });

  it("should show email error messages", async () => {
    const user = userEvent.setup();

    render(<Sut />);

    await user.click(screen.getByRole("button", { name: "Entrar" }));

    const emailInput = screen.getByLabelText("Email");
    const emailRequiredMessage = await screen.findByText("Email inválido");

    expect(emailRequiredMessage).toBeVisible();

    await user.type(emailInput, "invalid");

    const invalidEmailMessage = await screen.findByText("Email inválido");

    expect(invalidEmailMessage).toBeVisible();
  });

  it("should show error message if exists", () => {
    render(<Sut methods={{ error: "Email ou senha incorreta" }} />);

    const userNotFoundMessage = screen.getByText("Email ou senha incorreta");

    expect(userNotFoundMessage).toBeVisible();
  });

  it("should show password input if user exists", () => {
    render(<Sut methods={{ userEmail: "new-user@hotmail.com" }} />);

    const passwordInput = screen.getByLabelText("Senha");

    expect(passwordInput).toBeVisible();
  });
});
