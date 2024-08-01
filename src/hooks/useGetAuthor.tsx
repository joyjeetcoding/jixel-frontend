import { useState } from "react";
import toast from "react-hot-toast";

const useGetAuthor = () => {
  const [author, setAuthor] = useState([]);

  const getAuthorPage = async (id: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/author/${id}`
      );

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setAuthor(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return { getAuthorPage, author };
};

export default useGetAuthor;
