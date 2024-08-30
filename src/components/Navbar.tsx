"use client";
import React, { useEffect } from "react";
import DropDownMenu from "./DropDownMenu";
import Login from "@/allpages/LoginRegsiter/Login";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const { authUser, setAuthUser } = useAuthContext();
  useEffect(() => {
    const storedUser = localStorage.getItem("registered-user");
    console.log("Stored User:", storedUser);
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
  }, [setAuthUser]);
  console.log("AuthUser at Home Page", authUser);
  const router = useRouter();

  const redirectToHome = () => {
    router.push("/");
  };
  return (
    <div className="relative">
      {/* logo */}
      <div className="absolute z-[999] top-4 left-4 translate-y-2">
        <h1
          onClick={redirectToHome}
          className="cursor-pointer font-logo font-extrabold text-2xl"
        >
          Jixel
        </h1>
      </div>
      {/* Login/logout button */}
      <div className={`absolute right-4 top-4 md:flex font-btnfont z-[9]`}>
        {authUser ? <DropDownMenu /> : <Login />}
      </div>
    </div>
  );
};

export default Navbar;
