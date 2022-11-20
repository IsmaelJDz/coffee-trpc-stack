import bcrypt from "bcryptjs";

import { Queries } from "@/server/queries/index";
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

  const { id } = user;

  const userWithRol = await Queries.rolesUser(id);

  // if (!bcrypt.compareSync(password, user.password)) {
  //   return null;
  // }

  const roles = userWithRol.map(user => user.rol);

  const { id: idUser, name, email: emailDbUser } = user;

  return {
    id: idUser,
    name,
    email: emailDbUser,
    roles
  };
};

export const verifyOauthUser = async (oAuthEmail: string, oAuthName: string) => {
  const user = await prisma.user.findUnique({ where: { email: oAuthEmail } });

  if (user) {
    const userWithRol = await Queries.rolesUser(user?.id);

    const { id: userId, rol, name: userName, email: userEmail } = userWithRol[0];

    return { id: userId, name: userName, email: userEmail, role: rol };
  }

  if (!user) {
    const user = await prisma.user.create({
      data: {
        name: oAuthName,
        email: oAuthEmail,
        password: "@"
      }
    });

    await prisma.roles_user.create({
      data: {
        userId: user.id,
        roleId: 1
      }
    });

    const userWithRol = await Queries.rolesUser(user?.id);

    const { id: userId, rol, name: userName, email: userEmail } = userWithRol[0];

    return {
      user: {
        id: userId,
        name: userName,
        email: userEmail,
        role: rol
      }
    };
  }
};
