import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "./lib/prisma";
import authConfig from "@/auth.config";
import { getUserById } from "@/utils/users";
import { getTwoFactorConfirmationByUserId } from "./utils/two-factor-token";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    // async session({ token, session }) {
    // if (token.sub && session.user) {
    // session.user.id = token.sub;
    // }

    // if (session.user) {
    //   session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
    // }

    // if (session.user) {
    //   session.user.name = token.name;
    //   session.user.email = token.email;
    //   // session.user.isOAuth = token.isOAuth as boolean;
    // }

    // return session;
    // },
    // async jwt({ token }) {
    // if (!token.sub) return token;

    // const existingUser = await getUserById(token.sub);

    // if (!existingUser) return token;

    // token.name = existingUser.name;
    // token.email = existingUser.email;
    // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

    // return token;
    // },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
