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

  const validateInputs = ({ fullName, email, password, confirmPassword }: Props) => {
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const signUp = async ({ fullName, email, password, confirmPassword }: Props) => {
    const isValid = validateInputs({ fullName, email, password, confirmPassword });
    if (!isValid) return;

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
      localStorage.setItem("jwt", data.token);

      toast.success("Registration Successful");
      setOpen(false);
    } catch (error: any) {
      console.log("SignUp Error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signUp, open, setOpen };
};

export default useSignUp;
