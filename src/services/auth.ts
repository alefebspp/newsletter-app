import User from "@/types/user";
import { env } from "@/env";

export async function login(data: { email: string; password?: string }) {
  console.log("TEEST!");

  const response = await fetch(env.NEXT_PUBLIC_API_URL + "/login", {
    body: JSON.stringify(data),
    method: "POST",
  });

  const json: {
    error?: { message: string };
    shouldCreatePassword: boolean;
    token?: string;
    user?: User;
  } = await response.json();

  return json;
}
