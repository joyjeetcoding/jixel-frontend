"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlusSquare } from "react-icons/fa";

const Dashboard = () => {
  const router = useRouter();

  const handlePlus = () => {
    router.push("/create-post");
  };

  const { authUser } = useAuthContext();

  return (
    <div className="">
      {authUser ? (
        <FaPlusSquare
          onClick={handlePlus}
          className="cursor-pointer md:hidden absolute right-10 top-4"
          size={30}
        />
      ) : null}
      {authUser ? (
        <div className="relative  mx-4 md:max-w-3xl lg:max-w-6xl md:mx-auto ">
          <Button
            onClick={handlePlus}
            className="hidden md:block absolute top-14 right-0"
          >
            <span className="">Create New Post</span>
          </Button>
        </div>
      ) : null}
      <div className="absolute top-[20%] mx-4 md:max-w-3xl lg:max-w-6xl md:mx-auto">
        <div className="mb-5 md:mx-4">
          <div className="grid md:grid-cols-3 place-content-between">
            <div className="">
              <h2 className="font-extrabold text-2xl text-center md:text-left">
                AI founders play musical chairs
              </h2>
              <p className="mt-4 text-sm">Marina Temkin</p>
              <p className="text-sm">3 hours ago</p>
            </div>
            <div className="hidden md:block">
              <p className="px-4">
                Welcome to Startups Weekly — your weekly recap of everything you
                can’t miss from the world of startups. Want it in your inbox
                every Friday? Sign up here.
              </p>
            </div>
            <div className="hidden md:block">
              <img
                src="https://techcrunch.com/wp-content/uploads/2022/02/GettyImages-670880023.jpg?resize=1536,1086"
                alt="imagefile"
                className="w-[80%] float-right"
              />
            </div>
          </div>
          <Separator />
        </div>
        <div className="mb-5 md:mx-4">
          <div className="grid md:grid-cols-3 place-content-between">
            <div className="">
              <h2 className="font-extrabold text-2xl text-center md:text-left">
                AI founders play musical chairs
              </h2>
              <p className="mt-4 text-sm">Marina Temkin</p>
              <p className="text-sm">3 hours ago</p>
            </div>
            <div className="hidden md:block">
              <p className="px-4">
                Welcome to Startups Weekly — your weekly recap of everything you
                can’t miss from the world of startups. Want it in your inbox
                every Friday? Sign up here.
              </p>
            </div>
            <div className="hidden md:block">
              <img
                src="https://techcrunch.com/wp-content/uploads/2022/02/GettyImages-670880023.jpg?resize=1536,1086"
                alt="imagefile"
                className="w-[80%] float-right"
              />
            </div>
          </div>
          <Separator />
        </div>
        <div className="mb-5 md:mx-4">
          <div className="grid md:grid-cols-3 place-content-between">
            <div className="">
              <h2 className="font-extrabold text-2xl text-center md:text-left">
                AI founders play musical chairs
              </h2>
              <p className="mt-4 text-sm">Marina Temkin</p>
              <p className="text-sm">3 hours ago</p>
            </div>
            <div className="hidden md:block">
              <p className="px-4">
                Welcome to Startups Weekly — your weekly recap of everything you
                can’t miss from the world of startups. Want it in your inbox
                every Friday? Sign up here.
              </p>
            </div>
            <div className="hidden md:block">
              <img
                src="https://techcrunch.com/wp-content/uploads/2022/02/GettyImages-670880023.jpg?resize=1536,1086"
                alt="imagefile"
                className="w-[80%] float-right"
              />
            </div>
          </div>
          <Separator />
        </div>
        <div className="mb-5 md:mx-4">
          <div className="grid md:grid-cols-3 place-content-between">
            <div className="">
              <h2 className="font-extrabold text-2xl text-center md:text-left">
                AI founders play musical chairs
              </h2>
              <p className="mt-4 text-sm">Marina Temkin</p>
              <p className="text-sm">3 hours ago</p>
            </div>
            <div className="hidden md:block">
              <p className="px-4">
                Welcome to Startups Weekly — your weekly recap of everything you
                can’t miss from the world of startups. Want it in your inbox
                every Friday? Sign up here.
              </p>
            </div>
            <div className="hidden md:block">
              <img
                src="https://techcrunch.com/wp-content/uploads/2022/02/GettyImages-670880023.jpg?resize=1536,1086"
                alt="imagefile"
                className="w-[80%] float-right"
              />
            </div>
          </div>
          <Separator />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
