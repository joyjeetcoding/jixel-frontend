"use client";
import Hero from "./Hero";
import { useEffect, useState } from "react";
import Login from "../LoginRegsiter/Login";
import Register from "../LoginRegsiter/Register";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();
  const handleShowLogin = () => {
    setShowLogin(!showLogin);
  };

  const {authUser} = useAuthContext();

  useEffect(() => {
    router.push("/")
  }, [authUser])

  return (
    <div className="md:max-w-3xl lg:max-w-6xl md:mx-auto ">
      <div className="relative ">
        {/* logo */}
        <div className="absolute top-4 left-4 translate-y-2">
          <h1 className="font-logo font-extrabold text-2xl">Jixel</h1>
        </div>
        {/* Login/logout button */}
        <div className={`absolute right-4 top-4 md:flex font-btnfont z-[9]`}>
          <Login />
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
