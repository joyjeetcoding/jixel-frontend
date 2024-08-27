"use client"
import Image from "next/image";
import React from "react";
import { FaRegComment } from "react-icons/fa";
import Island from "../../assets/Island.jpg";

const PostsPage = () => {
  return (
    <div>
      <div>
        <h1 className="text-4xl lg:text-6xl font-extrabold">
          These fintech companies are hiring, despite a rough market in 2024
        </h1>
      </div>
      <div className="py-4 flex flex-1 justify-between">
        <div>
          <p className="font-semibold">Nairita Hazra</p>
          <p className="font-semibold">9:15 AM PDT • August 26, 2024</p>
        </div>
        <div className="flex cursor-pointer">
          <FaRegComment size={25} className="" />
          <span className="hidden md:block mx-2 font-semibold">Comment</span>
        </div>
      </div>
      <Image
        className="lg:h-[10%] lg:w-[80%] lg:mx-auto"
        src={Island}
        alt="Picture"
      />
      <div className="my-4">
        <p>
          The fintech segment, which saw massive growth during the pandemic and
          immediately after, has had a fairly rough 2024.
        </p>
        <br />
        <p>
          But while the rapid pace of funding has slowed, many fintechs are
          continuing to see growth and expand their teams. In an effort to
          better understand just how many fintechs might fit into this category,
          I put out a call asking for fintech companies that are hiring. After
          just over an hour, I had received more than a dozen responses. After
          just a few days, I heard from dozens more. The sheer number — and
          quality — of responses was surprising even to me, someone who writes
          about this space on a regular basis. TechCrunch isn’t a job board, of
          course. This isn’t a listing of all available roles in fintech. But if
          you were recently laid off, are a recent graduate or are just looking
          for a change, this will be a good place to start. And we plan to
          update this page regularly over time. Oh, and if you end up finding a
          job through this post, let me know on Twitter. Everyone likes a happy
          ending.
        </p>
      </div>
    </div>
  );
};

export default PostsPage;
