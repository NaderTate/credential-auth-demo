"use client";

import { Button } from "@nextui-org/react";
import { logout } from "@/actions/logout";

import { HiOutlineLogout } from "react-icons/hi";

type LogoutButtonProps = {};

export const LogoutButton = ({}: LogoutButtonProps) => {
  return (
    <Button onClick={async () => await logout()} isIconOnly variant="light">
      <HiOutlineLogout size={20} className="text-red-500" />
    </Button>
  );
};
