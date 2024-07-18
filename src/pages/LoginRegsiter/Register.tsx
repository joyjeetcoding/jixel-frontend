import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { z } from "zod";
import useSignUp from "@/hooks/useSignUp";
import { ButtonLoading } from "@/components/LoadingButton";

const userSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Name must be provided")
      .max(20, "Max length Exceeded"),
    email: z.string().email("Invalid Email format"),
    password: z.string().min(8, "Password must contain at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must contain at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password didn't matched",
    path: ["confirmPassword"],
  });

type UserFormData = z.infer<typeof userSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const { loading, signUp } = useSignUp();

  useEffect(() => {
    setValue("confirmPassword", confirmPassword);
  }, [password, setValue, confirmPassword]);

  const onSubmit = async (data: UserFormData) => {
    await signUp(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span> Sign Up Here</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                defaultValue="abc@youremail.com"
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
              <Label htmlFor="username" className="text-right">
                Full Name
              </Label>
              <Input
                id="fullName"
                defaultValue="Ramesh Raghavan"
                className="col-span-3"
                type="text"
                {...register("fullName")}
              />
            </div>
            {errors.fullName?.message && (
              <p className="w-full text-red-500 font-extrabold text-center text-xs">
                {errors.fullName?.message}
              </p>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                defaultValue="abc@youremail.com"
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                defaultValue="abc@youremail.com"
                className="col-span-3"
                type="password"
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword?.message && (
              <p className="w-full text-red-500 font-extrabold text-center text-xs">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          <DialogFooter>
            {loading ? (
              <ButtonLoading />
            ) : (
              <Button type="submit">Sign Up</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
