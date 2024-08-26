import { useMutation } from "react-query";


export const useCreatePost = () => {
  const createMyPostRequest = async (formData: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/createPost`,
      {
        method: "POST",
        body: formData,
        credentials: "include"
      }
    );

    console.log("Response after Posts Form Submit",response);
    

    if (!response.ok) {
      throw new Error("Failed to create Post");
    }
  };

  const {
    mutateAsync: createPost,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyPostRequest);

  return {
    createPost,
    isLoading,
    isError,
    isSuccess,
  };
};
