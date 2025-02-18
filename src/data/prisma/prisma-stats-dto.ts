import { randomUUID } from "node:crypto";
import Stat from "@/types/stat";
import StatsDTO from "../stats.dto";
import { prisma } from "@/lib/prisma";

export default class PrismaStatsDTO implements StatsDTO {
  async createStat(data: Omit<Stat, "id">) {
    const result =
      await prisma.$executeRaw`INSERT INTO newsletter_stats (id,user_id, post_id,utm_source,utm_medium,utm_campaign,utm_channel) VALUES (${randomUUID()},${
        data.user_id
      },${data.post_id}, ${data.utm_source ?? ""}, ${data.utm_medium ?? ""}, ${
        data.utm_campaign ?? ""
      }, ${data.utm_channel ?? ""});`;

    return result;
  }
}
