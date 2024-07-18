import { AuthContextProvider, useAuthContext } from "@/context/AuthContext";
import HomePage from "@/pages/Home/HomePage";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <AuthContextProvider>
      <main className="">
        <Toaster />
        <HomePage />
      </main>
    </AuthContextProvider>
  );
}
