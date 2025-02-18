import { type NextRequest } from "next/server";
import z from "zod";
import { serialize } from "cookie";
import { addHours } from "date-fns";
import { compare, hash } from "bcrypt";

import PrismaUserDto from "@/data/prisma/prisma-user-dto";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const userDto = new PrismaUserDto();

    const res = await request.json();

    const response = loginSchema.safeParse(res);

    if (!response.success) {
      const { errors } = response.error;

      return Response.json(
        {
          error: { message: "Invalid request", errors },
        },
        { status: 400 }
      );
    }

    const { email, password } = response.data;

    console.log("DATA:", response.data);

    const user = await userDto.getUserByEmail(email);

    if (!user) {
      return Response.json(
        {
          error: { message: "Email ou senha incorreta" },
        },
        { status: 400 }
      );
    }

    if (!user.verified && !password) {
      return Response.json(
        {
          shouldCreatePassword: true,
        },
        { status: 200 }
      );
    }

    if (user.verified && !password) {
      return Response.json(
        {
          shouldCreatePassword: false,
        },
        { status: 200 }
      );
    }

    if (password) {
      if (user.verified) {
        const passwordsMatch = await compare(password, user.password || "");
        if (!passwordsMatch) {
          return Response.json(
            {
              error: { message: "Email ou senha incorreta" },
            },
            { status: 400 }
          );
        }
      } else {
        const hashedPassword = await hash(password, 10);

        await userDto.updateUser({
          id: user.id,
          data: { password: hashedPassword, verified: true },
        });
      }

      const serialized = serialize("token", "test", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: addHours(new Date(), 1),
        path: "/",
      });

      return new Response(JSON.stringify({ user }), {
        status: 200,
        headers: { "Set-Cookie": serialized },
      });
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
}
