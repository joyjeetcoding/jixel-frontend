"use client"
import React, { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import parse from "html-react-parser";

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
}

const PostsPage: React.FC<PostPageProps> = ({postId}) => {
  const [postInfo, setPostInfo] = useState<PostInfo | null> (null);
  const [loadingPost, setLoadingPost] = useState(false);

  const options = {
    wordwrap: 130
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
  
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  
    return date.toLocaleDateString(undefined, options);
  };

  const getPostInfo = () => {
    setLoadingPost(true);
    const url = `${process.env.NEXT_PUBLIC_ALLPOSTS}/${postId}`;
    axios.get(url, {withCredentials: true})
    .then((response) => {
      setPostInfo(response.data);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Please try checking the internet");
    })
    .finally(() => {
      setLoadingPost(false);
    })
  }

  useEffect(() => {
    getPostInfo();
  }, [postId])

  return (
    <div>
      {
        loadingPost ? <div className="w-full lg:max-w-6xl md:md:max-w-3xl h-[80vh] flex justify-center items-center flex-col">
        <div className="loading loading-bars loading-lg"></div>
        <p className="font-extrabold font-btnfont">Please Wait</p>
      </div>: 
      <>
      <div>
        <h1 className="text-4xl lg:text-6xl font-extrabold">
          {postInfo?.title}
        </h1>
      </div>
      <div className="py-4 flex flex-1 justify-between">
        <div>
          <p className="font-semibold">@{postInfo?.author?.userName}</p>
          <p className="font-semibold">{postInfo?.createdAt ? formatDate(postInfo?.createdAt) : "Date not available"}</p>
        </div>
        <div className="flex cursor-pointer">
          <FaRegComment size={25} className="" />
          <span className="hidden md:block mx-2 font-semibold">Comment</span>
        </div>
      </div>
      <img src={postInfo?.imgUrl} alt="Picture" className="lg:h-[10%] lg:w-[80%] lg:mx-auto" />
      <div className="my-4">
        <p>
          {postInfo?.summary}
        </p>
        <br />
        <p className=" flex flex-wrap w-full">
          {postInfo?.description ? parse(postInfo.description) : "Description not available"}
        </p>
      </div>
      </>
      }
    </div>
  );
};

export default PostsPage;
