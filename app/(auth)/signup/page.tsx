import { NextPage } from "next";

import { SignUpForm } from "@/components/auth/RegisterForm";

type SignUpPageProps = {};

const SignUpPage: NextPage = async ({}: SignUpPageProps) => {
  return (
    <>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
