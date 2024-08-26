"use client";
import LoadingScreen from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/context/AuthContext";
import useGetAllPosts from "@/hooks/useGetAllPosts";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlusSquare } from "react-icons/fa";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString(undefined, options);
};


const Dashboard = () => {
  const router = useRouter();
  const { loading, posts } = useGetAllPosts();

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

      {/* Desgin of the post div starts */}

      <div className="absolute top-[20%] mx-4 md:max-w-3xl lg:max-w-6xl md:mx-auto">
        {loading ? (
          <div className="w-screen lg:max-w-6xl md:md:max-w-3xl h-[80vh] flex justify-center items-center flex-col">
            <div className="loading loading-bars loading-lg"></div>
            <p className="font-extrabold font-btnfont">Please Wait</p>
          </div>
        ) : (
          posts.map((post: any, index: number) => (
            <div className="mb-5 md:mx-4" key={index}>
              <div className="grid md:grid-cols-3 place-content-between">
                <div className="">
                  <h2 className="font-extrabold text-2xl text-center md:text-left">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-sm">{post.author.fullName}</p>
                  <p className="text-sm">{formatDate(post.createdAt)}</p>
                </div>
                <div className="hidden md:block">
                  <p className="px-4">{post.summary}</p>
                </div>
                <div className="hidden md:block">
                  <img
                    src={post.imgUrl}
                    alt="imagefile"
                    className="w-[80%] float-right"
                  />
                </div>
              </div>
              <Separator />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
