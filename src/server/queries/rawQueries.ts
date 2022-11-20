import { prisma } from "@/utils/prisma";

type RolesUser = {
  id: number;
  rol: string;
  name: string;
  email: string;
  password: string;
};

export const rolesUser = async (id: number) => {
  const userWithRol: RolesUser[] = await prisma.$queryRaw`
    SELECT u.id, r.name AS rol, u.name, u.email, u.password FROM Role AS r
    INNER JOIN Roles_user AS r_user
      on r.id = r_user.roleId
    INNER JOIN User AS u
      on u.id = r_user.userId
    WHERE u.id = ${id}
  `;

  return userWithRol;
};
