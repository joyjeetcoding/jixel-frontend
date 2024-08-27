"use client"
import PostsPage from "@/pages/Posts/PostsPage";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import React from "react";

interface PostProfileProps {
  params: {
    id: string;
  };
}
const PostProfile: NextPage<PostProfileProps> = () => {
  const router = useRouter();
  const redirectToHome = () => {
    router.push("/");
  };
  return (
    <div className="translate-y-20 p-5">
      <PostsPage />
    </div>
  );
};

export default PostProfile;
