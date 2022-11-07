import bcrypt from "bcryptjs";

import { prisma } from "@/utils/prisma";

export const checkEmailPassword = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    return null;
  }

  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    return null;
  }

  // if (!bcrypt.compareSync(password, user.password)) {
  //   return null;
  // }

  const { id, name, email: emailDbUser, role } = user;

  return {
    id,
    name,
    email: emailDbUser,
    role
  };
};

export const verifyOauthUser = async (oAuthEmail: string, oAuthName: string) => {
  const user = await prisma.user.findUnique({ where: { email: oAuthEmail } });

  if (user) {
    const { id, name, email, role } = user;
    return { id, name, email, role };
  }

  if (!user) {
    const user = await prisma.user.create({
      data: {
        name: oAuthName,
        email: oAuthEmail,
        role: "USER",
        password: "@"
      }
    });

    return {
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }
};
