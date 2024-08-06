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
import useUpdateAuthor from "@/hooks/useUpdateAuthor";
import toast, { Toaster } from "react-hot-toast";
import { ButtonLoading } from "@/components/LoadingButton";
import LoadingScreen from "@/components/LoadingScreen";

const formSchema = z.object({
  userName: z.string().min(1, {
    message: "Please provide your UserName",
  }),
  fullName: z.string().min(1, {
    message: "Please provide your Full Name",
  }),
  email: z.string().optional(),
  imageFile: z.any().optional(), // Handle file uploads
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
  });

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { updateAuthor, loading } = useUpdateAuthor();
  const [loadinggetuser, setLoadinggetuser] = useState(false);
  const getUserInfo = () => {
    setLoadinggetuser(true);
    const url = `${process.env.NEXT_PUBLIC_USERPROFILE}/${userId}`;
    axios
      .get(url,{ withCredentials: true })
      .then((response) => {
        setUserInfo(response.data);
        form.reset(response.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unauthorized Access - Login First")
      })
      .finally(() => {
        setLoadinggetuser(false);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  const onSubmit = async (data: UserFormData) => {
    // Handle file separately
    const { imageFile, ...restData } = data;
    await updateAuthor({ ...restData, id: userId, imageFile });
  };

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
                              if (e.target.files?.[0]) {
                                field.onChange(e); // Update react-hook-form state
                              }
                            }}
                            // You might want to use `defaultValue` here if you want to display the current image
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    disabled
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} defaultValue={userInfo?.email} />
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
                  {loading ? (
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
