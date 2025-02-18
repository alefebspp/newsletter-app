import { Prisma } from "@prisma/client";
import { type NextRequest } from "next/server";
import { redirect } from "next/navigation";
import z from "zod";

import PrismaUserDto from "@/data/prisma/prisma-user-dto";
import PrismaStatsDTO from "@/data/prisma/prisma-stats-dto";
import { constructNow } from "date-fns";

const schema = z.object({
  email: z.string().email(),
  id: z.string(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_channel: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const statsDto = new PrismaStatsDTO();
    const prismaUserDto = new PrismaUserDto();

    const searchParams = Object.fromEntries(request.nextUrl.searchParams);

    const res = await request.json();
    console.log("BODY:", res);
    console.log("PARAMS:", searchParams);

    const response = schema.safeParse(searchParams);

    if (!response.success) {
      return redirect("/login");
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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("ERROR:", error.stack);
    }
  }
}
