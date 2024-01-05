import { auth } from "@/auth";
import { NextPage } from "next";

import { Card, CardBody } from "@nextui-org/react";
import { LogoutButton } from "./_components/LogoutButton";

type UsersPageProps = {};

const UsersPage: NextPage = async ({}: UsersPageProps) => {
  const session = await auth();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card>
        <CardBody>
          <div className="flex items-center gap-5">
            <p>Logged in as {session?.user.email}</p>
            <LogoutButton />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UsersPage;
