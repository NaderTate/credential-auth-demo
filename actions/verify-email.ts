"use server";

import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/utils/users";
import { getVerificationTokenByToken } from "@/utils/verification-token";

export const verifyEmail = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const confirmEmail = prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  const deleteToken =
    existingToken &&
    prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });
  await prisma.$transaction([confirmEmail, deleteToken]);
  return { success: "Email verified!" };
};
