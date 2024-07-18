"use client";
import Hero from "./Hero";
import Login from "../LoginRegsiter/Login";
import { useAuthContext } from "@/context/AuthContext";
import DropDownMenu from "@/components/DropDownMenu";
import { useEffect } from "react";

const HomePage = () => {
  const { authUser, setAuthUser } = useAuthContext();
  useEffect(() => {
    const storedUser = localStorage.getItem("registered-user");
    console.log("Stored User:", storedUser);
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
  }, [setAuthUser]);

  console.log("AuthUser", authUser);

  return (
    <div className="md:max-w-3xl lg:max-w-6xl md:mx-auto ">
      <div className="relative ">
        {/* logo */}
        <div className="absolute top-4 left-4 translate-y-2">
          <h1 className="font-logo font-extrabold text-2xl">Jixel</h1>
        </div>
        {/* Login/logout button */}
        <div className={`absolute right-4 top-4 md:flex font-btnfont z-[9]`}>
          {authUser ? <DropDownMenu /> : <Login />}
        </div>
      </div>

      <div className="relative">
        {/* Hero Component */}
        <Hero />
      </div>
    </div>
  );
};

export default HomePage;
