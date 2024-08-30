"use client";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";

export const useCreatePost = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const createMyPostRequest = async (formData: FormData) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/createPost`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    console.log("Response after Posts Form Submit", response);

    if (!response.ok) {
      throw new Error("Failed to create Post");
    }
  };

  const mutation = useMutation(createMyPostRequest);

  if (!isMounted) {
    return {
      createPost: () => Promise.resolve(),
      isLoading: false,
      isError: false,
      isSuccess: false,
    };
  }

  return {
    createPost: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
