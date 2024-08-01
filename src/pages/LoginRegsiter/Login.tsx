import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Register from "./Register";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "@/hooks/useLogin";
import { ButtonLoading } from "@/components/LoadingButton";

const userSchema = z.object({
  email: z.string().email("Invalid Email format"),
  password: z.string().min(1, "Password is required"),
});

type UserFormData = z.infer<typeof userSchema>;

const Login: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  const { login, loading, open, setOpen } = useLogin();

  const handleRegister = () => {
    setShowRegister(!showRegister);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserFormData) => {
    await login(data);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Login</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>Login to continue</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="abc@youremail.com"
                  className="col-span-3"
                  type="email"
                  {...register("email")}
                />
              </div>
              {errors.email?.message && (
                <p className="w-full text-red-500 font-extrabold text-center text-xs">
                  {errors.email?.message}
                </p>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="password"
                  className="col-span-3"
                  type="password"
                  {...register("password")}
                />
              </div>
              {errors.password?.message && (
                <p className="w-full text-red-500 font-extrabold text-center text-xs">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <DialogDescription className="my-4">
              Don't have an account?{" "}
              <span
                onClick={handleRegister}
                className="hover:underline cursor-pointer"
              >
                <Register />
              </span>
            </DialogDescription>
            <DialogFooter>
              {loading ? (
                <ButtonLoading />
              ) : (
                <Button type="submit">Login</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Login;
