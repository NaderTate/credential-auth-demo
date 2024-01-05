import { NextPage } from "next";

import { PasswordResetForm } from "@/components/auth/PasswordResetForm";

type ResetPasswordPageProps = {};

const ResetPasswordPage: NextPage = async ({}: ResetPasswordPageProps) => {
  return (
    <>
      <PasswordResetForm />
    </>
  );
};

export default ResetPasswordPage;
