import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";
import UserDTO from "../user-dto";

import User from "@/types/user";

export default class PrismaUserDto implements UserDTO {
  async updateUser({
    data,
    id,
  }: {
    data: Partial<Pick<User, "email" | "password" | "verified">>;
    id: string;
  }) {
    const user = await this.getUserById(id);

    await prisma.$executeRaw`UPDATE newsletter_user SET email = ${
      data.email ?? user?.email
    }, password = ${data.password ?? user?.password}, verified = ${
      data.verified ?? user?.verified
    } WHERE id = ${id}`;
  }

  async getUserByEmail(email: string) {
    const user = (
      await prisma.$queryRaw<
        User[]
      >`SELECT * FROM newsletter_user WHERE email = ${email};`
    ).at(0);

    return user;
  }

  async getUserById(id: string) {
    const user = (
      await prisma.$queryRaw<
        User[]
      >`SELECT * FROM newsletter_user WHERE id = ${id};`
    ).at(0);

    return user;
  }

  async createUser(data: Omit<User, "verified" | "id">) {
    await prisma.$executeRaw`INSERT INTO newsletter_user (id, email, password) VALUES (${randomUUID()},${
      data.email
    },${data.password});`;

    const user = await this.getUserByEmail(data.email);

    return user;
  }
}
