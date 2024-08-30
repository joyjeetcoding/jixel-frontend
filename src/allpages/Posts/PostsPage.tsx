"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import Comment from "./Comment";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/context/AuthContext";

interface PostPageProps {
  postId: string;
}

interface PostInfo {
  title: string;
  summary: string;
  imgUrl: string;
  description: string;
  author: {
    fullName: string;
    userName: string;
  };
  userName: string;
  createdAt: string;
  loveCount: number;
  lovedBy: string[];
  userHasLoved: boolean;
}

const PostsPage: React.FC<PostPageProps> = ({ postId }) => {
  const [postInfo, setPostInfo] = useState<PostInfo | null>(null);
  const [loadingPost, setLoadingPost] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString(undefined, options);
  };

  const getPostInfo = async () => {
    setLoadingPost(true);
    const url = `/api/user/createPost/${postId}`;
    try {
      const token = localStorage.getItem("jwt");
  
      if (!token) {
        throw new Error("No token found");
      }
  
      const response = await axios.get(url, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      setPostInfo(response.data);
    } catch (err: any) {
      console.log(err);
      toast.error("Please try checking the internet");
    } finally {
      setLoadingPost(false);
    }
  };
  

  useEffect(() => {
    getPostInfo();
  }, [postId]);

  const handleLovePost = async () => {
    try {
      const token = localStorage.getItem("jwt");

      if (!token) {
        throw new Error("No token found");
      }

      await axios.post(
        `/api/user/lovePost/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPostInfo((prevPostInfo) =>
        prevPostInfo
          ? {
              ...prevPostInfo,
              loveCount: prevPostInfo.loveCount + 1,
              userHasLoved: true,
            }
          : null
      );

      toast.success("Post Loved Successfully");
    } catch (error: any) {
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login to give Love React");
      }
    }
  };

  const { authUser } = useAuthContext();

  return (
    <div>
      {loadingPost ? (
        <div className="w-full lg:max-w-6xl md:md:max-w-3xl h-[80vh] flex justify-center items-center flex-col">
          <div className="loading loading-bars loading-lg"></div>
          <p className="font-extrabold font-btnfont">Please Wait</p>
        </div>
      ) : (
        <>
          <div>
            <h1 className="text-4xl lg:text-6xl font-extrabold font-merri">
              {postInfo?.title}
            </h1>
          </div>
          <div className="py-4 flex flex-1 justify-between">
            <div className="font-merri">
              <p className="font-semibold">@{postInfo?.author?.userName}</p>
              <p className="font-semibold">
                {postInfo?.createdAt
                  ? formatDate(postInfo?.createdAt)
                  : "Date not available"}
              </p>
              <p className="text-pink-500 font-extrabold">
                Love Count: {postInfo?.loveCount}
              </p>
            </div>
            <div
              onClick={handleLovePost}
              className={`${
                authUser
                  ? `${
                      postInfo?.userHasLoved
                        ? "text-pink-500 flex cursor-pointer font-merri hover:text-pink-500"
                        : "text-black flex cursor-pointer font-merri hover:text-pink-500"
                    }`
                  : `disabled flex cursor-pointer font-merri`
              } `}
            >
              <FaHeart size={25} className="" />
              <span className="hidden md:block mx-2 font-semibold">Love</span>
            </div>
          </div>
          <img
            src={postInfo?.imgUrl}
            alt="Picture"
            className="lg:h-[10%] lg:w-[80%] lg:mx-auto"
          />
          <div className="my-4">
            <p className="font-merri font-semibold md:text-2xl">
              {postInfo?.summary}
            </p>
            <br />
            <p className="">
              {postInfo?.description
                ? parse(postInfo.description)
                : "Description not available"}
            </p>
          </div>
          <Separator className="pb-1 mb-4" />
          <p className="text-center text-lg font-semibold font-merri">
            End of the Post
          </p>
        </>
      )}
    </div>
  );
};

export default PostsPage;
