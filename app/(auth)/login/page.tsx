import { NextPage } from "next";

import { LoginForm } from "@/components/auth/LoginForm";

type LoginPageProps = {};

const LoginPage: NextPage = async ({}: LoginPageProps) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
