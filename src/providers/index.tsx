"use client";
import { PropsWithChildren } from "react";

import { UserContextProvider } from "@/context/user.context";

export default function Providers({ children }: PropsWithChildren) {
  return <UserContextProvider>{children}</UserContextProvider>;
}
