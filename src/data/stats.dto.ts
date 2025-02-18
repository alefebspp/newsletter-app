import Stat from "@/types/stat";

export default interface StatsDTO {
  createStat: (data: Omit<Stat, "id">) => Promise<number>;
}
