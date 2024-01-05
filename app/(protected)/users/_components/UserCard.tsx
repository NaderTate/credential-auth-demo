import { auth } from "@/auth";

import { Card, CardBody } from "@nextui-org/react";
import { LogoutButton } from "./LogoutButton";

type UserCardProps = {};

export const UserCard = async ({}: UserCardProps) => {
  const session = await auth();

  return (
    <Card>
      <CardBody>
        <div className="flex items-center gap-5">
          <p>Logged in as {session?.user.email}</p>
          <LogoutButton />
        </div>
      </CardBody>
    </Card>
  );
};
