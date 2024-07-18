import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {setAuthUser} = useAuthContext();

  const signUp = async ({
    fullName,
    email,
    password,
    confirmPassword,
  }: Props) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("registered-user", JSON.stringify(data));

      setAuthUser(data);

      toast.success("Registration Successful");
      setOpen(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signUp, open, setOpen };
};

export default useSignUp;
