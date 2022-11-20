import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import bcrypt from "bcryptjs";

import { createUserOutputSchema, createUserSchema } from "@/schema/user.schema";
import { Queries } from "@/server/queries/index";
import { isValidEmail } from "@/utils/common";
import { jwt } from "@/utils/index";

import { createRoute } from "../createRoute";

export const userRouter = createRoute().mutation("register-user", {
  // Example another way to call the function
  // resolve:async (params:type) => {}

  input: createUserSchema,
  output: createUserOutputSchema,
  async resolve({ ctx, input }) {
    // if (!ctx.user) {
    //   new trpc.TRPCError({
    //     code: "FORBIDDEN",
    //     message: "Can not create a post while logged out"
    //   });
    // }

    const { name, email, password } = input;

    if (!isValidEmail(email)) {
      throw new trpc.TRPCError({
        code: "CONFLICT",
        message: "Invalid email"
      });
    }

    const userEmail = await ctx.prisma.user.findUnique({ where: { email } });
    if (userEmail) {
      throw new trpc.TRPCError({
        code: "CONFLICT",
        message: "Email already exists"
      });
    }

    try {
      const user = await ctx.prisma.user.create({
        data: {
          name,
          email,
          password: bcrypt.hashSync(password, 10)
        }
      });

      const { id } = user;
      const token = jwt.signJwt(id, email);

      await ctx.prisma.roles_user.create({
        data: {
          userId: id,
          roleId: 1
        }
      });

      const userWithRol = await Queries.rolesUser(id);

      const { id: userId, rol, name: userName, email: userEmail, password: userPassword } = userWithRol[0];

      return {
        user: {
          id: userId,
          name: userName,
          email: userEmail,
          role: rol,
          password: userPassword,
          token
        }
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new trpc.TRPCError({
            code: "CONFLICT",
            message: "User already exists"
          });
        }
      }

      throw new trpc.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong"
      });
    }
  }
});
// .query("validate-user", {
//   input: verifyUserSchema,
//   // output: verifyUserOutputSchema,
//   async resolve({ ctx, input }) {
//     const { email, password } = input;

//     const user = await ctx.prisma.user.findUnique({ where: { email } });

//     if (!user) {
//       throw new trpc.TRPCError({
//         code: "NOT_FOUND",
//         message: "User not found"
//       });
//     }

//     const isMatch = bcrypt.compareSync(password, user.password);

//     if (!isMatch) {
//       throw new trpc.TRPCError({
//         code: "UNAUTHORIZED",
//         message: "Invalid credentials"
//       });
//     }

//     const { id, name, email: emailDbUser, role } = user;

//     return {
//       id,
//       name,
//       email: emailDbUser,
//       role
//     };
//   }
// });
