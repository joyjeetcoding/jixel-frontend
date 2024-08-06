"use client"
import { useAuthContext } from "@/context/AuthContext";
import HomePage from "@/pages/Home/HomePage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function Home() {
  
  return (
      <main className="">
        <Toaster />
        <HomePage />
      </main>
  );
}
