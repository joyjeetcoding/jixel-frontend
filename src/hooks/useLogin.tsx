import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  email: string;
  password: string;
};

function handleInputErrors({ email, password }: Props) {
  if (!email || !password) {
    toast.error("All the fields are necessary");
    return false;
  }

  return true;
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { setAuthUser } = useAuthContext();

  const login = async ({ email, password }: Props) => {
    const success = handleInputErrors({ email, password });

    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      console.log(data);

      toast.success("Login Successful")

      localStorage.setItem("registered-user", JSON.stringify(data));

      setAuthUser(data);
      setOpen(false);

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {loading, login, open, setOpen}
};

export default useLogin;
