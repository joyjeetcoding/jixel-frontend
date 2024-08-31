"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetAllPosts = (page: number, limit: number) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/user/createPost/?page=${page}&limit=${limit}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();

        if (data.error) {
          toast.error(data.error);
        }

        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [page, limit]);

  return { loading, posts, totalPages };
};

export default useGetAllPosts;
