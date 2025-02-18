import User from "@/types/user";
import UserDTO from "../user-dto";

export default class InMemoryUserDTO implements UserDTO {
  users: User[] = [];

  async updateUser({
    id,
    data,
  }: {
    data: Partial<Pick<User, "email" | "password">>;
    id: string;
  }) {
    const user = this.users.find((user) => user.id === id);

    if (user) {
      const filteredUsers = this.users.filter((user) => user.id !== id);

      this.users = [...filteredUsers, { ...user, ...data }];
    }
  }

  async getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async createUser(data: Omit<User, "verified">) {
    const newUser = {
      ...data,
      verified: false,
    };

    this.users.push(newUser);

    return newUser;
  }
}
