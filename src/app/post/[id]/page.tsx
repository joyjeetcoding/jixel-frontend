"use client"
import PostsPage from "@/allpages/Posts/PostsPage";
import { NextPage } from "next";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface PostProfileProps {
  params: {
    id: string;
  };
}
const PostProfile: NextPage<PostProfileProps> = () => {
  const router = useRouter();
  
  const params = useParams();

  const postId = params?.id;
  
  

  return (
    <div className="translate-y-20 p-5">
      <PostsPage postId={postId as string} />
    </div>
  );
};

export default PostProfile;
