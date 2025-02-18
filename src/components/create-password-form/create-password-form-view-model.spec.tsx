import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import CreatePasswordFormViewModel from "./create-password-form-view-model";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

function Sut() {
  return <CreatePasswordFormViewModel email="valid-email@hotmail.com" />;
}

describe("<CreatePasswordFormViewModel />", () => {
  it("should render password input with rules", () => {
    render(<Sut />);

    const passwordInput = screen.getByLabelText("Senha");
    const confirmPasswordInput = screen.getByLabelText("Confirmar senha");
    const ruleChecks = screen.getAllByTestId(/-rule/);

    expect(passwordInput).toBeVisible();
    expect(confirmPasswordInput).toBeVisible();
    expect(ruleChecks).toHaveLength(5);
  });

  it("should correctly render the rules of password creation", async () => {
    const user = userEvent.setup();

    render(<Sut />);

    const passwordInput = screen.getByLabelText("Senha");

    await user.type(passwordInput, "123456");

    let successRules = await screen.findAllByTestId("valid-password-rule");

    expect(successRules).toHaveLength(1);

    await user.type(passwordInput, "T");

    successRules = await screen.findAllByTestId("valid-password-rule");

    expect(successRules).toHaveLength(2);

    await user.type(passwordInput, "est");

    successRules = await screen.findAllByTestId("valid-password-rule");

    expect(successRules).toHaveLength(4);

    await user.type(passwordInput, "!");

    successRules = await screen.findAllByTestId("valid-password-rule");

    expect(successRules).toHaveLength(5);
  });

  it("should show error message if password is not equal to confirm password", async () => {
    const user = userEvent.setup();

    render(<Sut />);

    const passwordInput = screen.getByLabelText("Senha");

    await user.type(passwordInput, "123456");

    const confirmPasswordError = await screen.findByText(
      "As senhas devem ser iguais"
    );
    const submitButton = await screen.findByRole("button");

    expect(confirmPasswordError).toBeVisible();
    expect(submitButton).toBeDisabled();
  });
});
