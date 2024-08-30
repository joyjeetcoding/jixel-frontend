"use client"
import { User } from "@/types/types";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useEffect, useState } from 'react';

export const useUpdateAuthor = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const useUpdateAuthorRequest = async (
    userFormData: FormData,
    userId: string
  ): Promise<User | undefined> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/author/${userId}`,
        {
          method: "PUT",
          body: userFormData,
        }
      );

      if (!response.ok) {
        let errorMessage = "Failed to update author";

        try {
          const errorResponse = await response.json();
          errorMessage =
            typeof errorResponse.error === "string"
              ? errorResponse.error
              : errorMessage;
        } catch (e) {
          console.error("Error parsing response as JSON:", e);
        }

        return Promise.reject(errorMessage);

      }

      const data: User = await response.json();
      return data;
    } catch (error: any) {
      let errorMessage = "Failed to update author";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else {
        console.error("Unexpected error type:", error);
      }

      toast.error(errorMessage)
    }
  };

  const mutationFunction = async (data: {
    userFormData: FormData;
    userId: string;
  }) => {
    return useUpdateAuthorRequest(data.userFormData, data.userId);
  };

  const mutation = useMutation(mutationFunction, {
    onSuccess: () => {
      if (isMounted) {
        toast.success("Author Updated");
      }
    },
    onError: (err: any) => {
      if (isMounted) {
        toast.error(err);
      }
    }
  });

  if (!isMounted) {
    return { 
      updateUserStatus: () => Promise.resolve(), 
      isLoading: false 
    };
  }

  return { 
    updateUserStatus: mutation.mutateAsync, 
    isLoading: mutation.isLoading 
  };
};