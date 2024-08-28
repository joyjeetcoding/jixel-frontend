"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useGetAllPosts from "@/hooks/useGetAllPosts";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 5;
  const { loading, posts, totalPages } = useGetAllPosts(page, limit);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(nextPage => nextPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handlePostClick = (id: string) => {
    router.push(`/post/${id}`);
  };

  return (
    <div className="p-4 md:max-w-3xl lg:max-w-6xl md:mx-auto">
      {loading ? (
        <div className="w-full lg:max-w-6xl md:max-w-3xl h-[80vh] flex justify-center items-center flex-col">
          <div className="loading loading-bars loading-lg"></div>
          <p className="font-extrabold font-btnfont">Please Wait</p>
        </div>
      ) : (
        <>
          {posts.map((post: any) => (
            <div key={post._id} onClick={() => handlePostClick(post._id)} className="mb-5 md:mx-4 cursor-pointer">
              <div className="grid md:grid-cols-3 place-content-between">
                <div className="">
                  <h2 className="font-extrabold text-2xl text-center md:text-left">{post.title}</h2>
                  <p className="mt-4 text-sm">{post.author.fullName}</p>
                  <p className="text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="hidden md:block">
                  <p className="px-4">{post.summary}</p>
                </div>
                <div className="hidden md:block">
                  <img src={post.imgUrl} alt="Post image" className="w-[80%] float-right" />
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <Button onClick={handlePrevPage} disabled={page === 1}>Previous</Button>
            <Button onClick={handleNextPage} disabled={page === totalPages}>Next</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
