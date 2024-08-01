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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

const DropDownMenu = () => {
  const { authUser } = useAuthContext();
  const router = useRouter();
  const { loading, logout } = useLogOut();



  const handleLogout = async (e: any) => {
    e.preventDefault();

    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-extrabold font-btnfont flex">
        Hii {authUser?.fullName.split(" ")[0]}!&nbsp;
        <FaUserCircle className="absolute -right-3 lg:-right-5 translate-y-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/user-profile/${authUser?._id}`}>
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        </Link>
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
