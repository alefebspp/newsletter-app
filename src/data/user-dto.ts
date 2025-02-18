import User from "@/types/user";

export default interface UserDTO {
  getUserByEmail: (email: string) => Promise<User | undefined>;
  getUserById: (id: string) => Promise<User | undefined>;
  createUser: (data: Omit<User, "verified">) => Promise<User | undefined>;
  updateUser: (data: {
    data: Partial<Pick<User, "email" | "password">>;
    id: string;
  }) => Promise<void>;
}
