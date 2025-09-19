import { hash } from "bcrypt";
import prisma from "../config/dbconfig.js";

export async function resgisterUserService(userData) {
  const { username, email, password } = userData;

  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  delete newUser.password;
  return newUser;
}
