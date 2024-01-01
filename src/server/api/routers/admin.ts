import { z } from "zod";

import { createTRPCRouter, superAdminProdcedure } from "@/server/api/trpc";

// eslint-disable-next-line import/prefer-default-export
export const adminRouter = createTRPCRouter({
  getAllAdminUsers: superAdminProdcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      where: {
        systemRole: {
          in: ["admin", "superadmin"],
        },
      },
    });
  }),
  inviteAdmin: superAdminProdcedure
    .input(
      z.object({
        email: z.string().email(),
        systemRole: z.enum(["admin", "superadmin"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.create({
        data: {
          email: input.email,
          systemRole: input.systemRole,
        },
      });
    }),
});
