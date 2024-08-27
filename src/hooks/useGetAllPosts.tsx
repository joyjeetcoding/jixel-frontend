"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_ALLPOSTS}`);

        const data = await res.json();

        if (data.error) {
          toast.error(data.error);
        }

        setPosts(data);
      } catch (error: any) {
        toast.error(error.message);
        console.log(error.message);
        
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  return { loading, posts };
};

export default useGetAllPosts;
