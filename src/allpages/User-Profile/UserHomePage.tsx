"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ButtonLoading } from "@/components/LoadingButton";
import LoadingScreen from "@/components/LoadingScreen";
import { useUpdateAuthor } from "@/hooks/useUpdateAuthor";

const formSchema = z.object({
  userName: z.string().min(1, {
    message: "Please provide your UserName",
  }),
  fullName: z.string().min(1, {
    message: "Please provide your Full Name",
  }),
  email: z.string().optional(),
  imageFile: z.instanceof(File).optional(),
});

interface UserHomePageProps {
  userId: string;
}

interface UserInfo {
  fullName: string;
  email: string;
  userName: string;
}
type UserFormData = z.infer<typeof formSchema>;

const UserHomePage: React.FC<UserHomePageProps> = ({ userId }) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {}, // Avoid changing defaultValues dynamically
  });

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loadinggetuser, setLoadinggetuser] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { updateUserStatus, isLoading } = useUpdateAuthor();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoadinggetuser(true);
        const url = `${process.env.NEXT_PUBLIC_USERPROFILE}/${userId}`;
        const response = await axios.get(url, { withCredentials: true });
        setUserInfo(response.data);
        form.reset(response.data);
      } catch (err:any) {
        console.error("Axios Error:", err.response || err.message || err);
        if (err.response?.status === 401) {
          toast.error("Unauthorized Access - Login First");
        } else if (err.response?.status === 403) {
          toast.error("Forbidden - You don't have permission");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setLoadinggetuser(false);
      }
    };

    getUserInfo();
  }, [userId]);

  const onSubmit = async (formDataJson: UserFormData) => {
    // Handle file separately
    const formData = new FormData();
    formData.append("userName", formDataJson.userName);
    formData.append("fullName", formDataJson.fullName);
    if (formDataJson.email) formData.append("email", formDataJson.email);
    if (formDataJson.imageFile)
      formData.append("imageFile", formDataJson.imageFile);

    await updateUserStatus({ userFormData: formData, userId });
  };

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <>
      {loadinggetuser ? (
        <LoadingScreen />
      ) : (
        <div className={"md:max-w-3xl lg:max-w-6xl md:mx-auto"}>
          <Toaster />
          <div className="flex flex-col p-5">
            <h2 className="font-btnfont text-center text-3xl font-extrabold">
              Welcome to your Profile
            </h2>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 font-btnfont"
                >
                  <FormField
                    control={form.control}
                    name="imageFile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Photo</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => {
                              field.onChange(
                                e.target.files ? e.target.files[0] : null
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input disabled {...field} defaultValue={userInfo?.email} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} defaultValue={userInfo?.userName} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} defaultValue={userInfo?.fullName} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {isLoading ? (
                    <ButtonLoading />
                  ) : (
                    <Button
                      type="submit"
                      className="hover:bg-yellow-400 hover:text-black"
                    >
                      Update
                    </Button>
                  )}
                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserHomePage;
