"use client";
import LoadingScreen from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/context/AuthContext";
import useGetAllPosts from "@/hooks/useGetAllPosts";
import { useRouter } from "next/navigation";
import React from "react";

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
  const handlePostClick = (id:String) => {
    router.push(`/post/${id}`);
  }

  const { authUser } = useAuthContext();

  // Sorting the posts by new posts at first with the help of createdAt
  const sortedPosts = posts.slice().sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="">
      
      {authUser ? (
        <div className="p-4 md:max-w-3xl lg:max-w-6xl md:mx-auto ">
          <Button
            onClick={handlePlus}
            className="hover:bg-yellow-400 hover:text-black hover:font-bold"
          >
            <span className="">Create New Post</span>
          </Button>
        </div>
      ) : null}

      {/* Desgin of the post div starts */}

      <div className=" mx-4 md:max-w-3xl lg:max-w-6xl md:mx-auto">
        {loading ? (
          <div className="w-full lg:max-w-6xl md:md:max-w-3xl h-[80vh] flex justify-center items-center flex-col">
            <div className="loading loading-bars loading-lg"></div>
            <p className="font-extrabold font-btnfont">Please Wait</p>
          </div>
        ) : (
          sortedPosts.map((post: any, index: number) => (
            <div className="mb-5 md:mx-4 cursor-pointer" 
            key={index}
            onClick={() => handlePostClick(post._id)}
            >
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
              <Separator className="mt-5" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
