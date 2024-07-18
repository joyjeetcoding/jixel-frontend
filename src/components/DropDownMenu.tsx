import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "./ui/button";
import useLogOut from "@/hooks/useLogOut";
import { ButtonLoading } from "./LoadingButton";

const DropDownMenu = () => {
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogOut();

  const handleLogout = async (e: any) => {
    e.preventDefault();

    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-extrabold font-btnfont">
        {authUser?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        {loading ? (
          <ButtonLoading />
        ) : (
          <Button className="w-full mt-2" onClick={handleLogout}>
            Log out
          </Button>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenu;
