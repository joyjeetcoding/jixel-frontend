"use client";
import Hero from "./Hero";
import { useState } from "react";
import Login from "../LoginRegsiter/Login";
import Register from "../LoginRegsiter/Register";

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="md:max-w-3xl lg:max-w-6xl md:mx-auto ">
      <div className="relative ">
        {/* logo */}
        <div className="absolute top-4 left-4 translate-y-2">
          <h1 className="font-logo font-extrabold text-2xl">Jixel</h1>
        </div>
        {/* Login/logout button */}
        <div onClick={handleShowLogin} className={`${!showLogin ? `absolute right-4 top-4 md:flex font-btnfont z-[9999]` : `absolute right-4 top-4 md:flex font-btnfont z-[0] `}`}>
          <Login />
          <Register />
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
