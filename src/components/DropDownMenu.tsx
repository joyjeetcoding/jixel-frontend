"use client";
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import toast from "react-hot-toast";
import Island from "../assets/Island.jpg";
import Image from "next/image";

interface UserInfo {
  imageUrl: string;
}

const DropDownMenu = () => {
  const { authUser } = useAuthContext();
  const router = useRouter();
  const { loading, logout } = useLogOut();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const handleLogout = async (e: any) => {
    e.preventDefault();

    await logout();
  };

  const userId = authUser?._id;

  const getUserInfo = () => {
    const url = `${process.env.NEXT_PUBLIC_USERPROFILE}/${userId}`;
    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((err) => {
        console.log("Error in getting Profile image", err);
        toast.error("Sign In Again");
      });
  };

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-extrabold font-btnfont flex">
        <span className="-translate-x-6">
          Hii {authUser?.fullName.split(" ")[0]}!&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        {userInfo?.imageUrl ? (
          <img
            src={userInfo?.imageUrl}
            className="absolute -right-3 lg:-right-5 -translate-y-1 -translate-x-2 h-8 w-8 rounded-full"
            alt="dp"
          />
        ) : (
          <FaUserCircle
            size={25}
            className="absolute -right-3 lg:-right-5 -translate-y-1 -translate-x-2 h-8 w-8 rounded-full"
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/user-profile/${authUser?._id}`}>
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
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
