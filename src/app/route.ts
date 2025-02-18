import { NextResponse, type NextRequest } from "next/server";
import z from "zod";

import PrismaUserDto from "@/data/prisma/prisma-user-dto";
import PrismaStatsDTO from "@/data/prisma/prisma-stats-dto";

const schema = z.object({
  email: z.string().email(),
  id: z.string(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_channel: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const statsDto = new PrismaStatsDTO();
  const prismaUserDto = new PrismaUserDto();

  const searchParams = Object.fromEntries(request.nextUrl.searchParams);

  console.log("PARAMS:", searchParams);

  const response = schema.safeParse(searchParams);

  if (!response.success) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { email, id, ...infos } = response.data;

  const user = await prismaUserDto.getUserByEmail(email);

  if (user) {
    await statsDto.createStat({ post_id: id, user_id: user.id, ...infos });

    return Response.json(
      {
        message: "Success",
      },
      { status: 200 }
    );
  }

  const newUser = await prismaUserDto.createUser({
    email,
    password: "temporary",
  });

  if (newUser) {
    await statsDto.createStat({ post_id: id, user_id: newUser.id, ...infos });
  }

  return Response.json(
    {
      message: "Success",
    },
    { status: 200 }
  );
}
