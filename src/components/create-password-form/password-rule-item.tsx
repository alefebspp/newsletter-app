"use client";

import { cn } from "@/lib/utils";
import Check from "../icons/check";
import X from "../icons/x";

type Props = {
  isValid: boolean;
  label: string;
};

export default function PasswordRuleItem({ isValid, label }: Props) {
  return (
    <div
      data-testid={`${isValid ? "valid" : "invalid"}-password-rule`}
      className={cn("flex gap-2 items-center text-red-500 mb-2", {
        "text-green-500": isValid,
      })}
    >
      {isValid && <Check className="text-green-600 w-5 h-5" />}
      {!isValid && <X className="text-red-600 w-5 h-5" />}
      <span className="text-sm">{label}</span>
    </div>
  );
}
