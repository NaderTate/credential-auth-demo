import { NextPage } from "next";

import { NewPasswordForm } from "@/components/auth/NewPasswordForm";

type NewPasswordPageProps = {};

const NewPasswordPage: NextPage = async ({}: NewPasswordPageProps) => {
  return (
    <>
      <NewPasswordForm />
    </>
  );
};

export default NewPasswordPage;
