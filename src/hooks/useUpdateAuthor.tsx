import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  fullName: string;
  userName: string;
  id: string;
};

const useUpdateAuthor = () => {
  const [loading, setLoading] = useState(false);

  const updateAuthor = async ({ id, fullName, userName }: Props) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_USERPROFILE}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, userName }),
      });
      const data = await res.json();

      if(data.error) {
        throw new Error(data.error)
      }

      toast.success("Updated Successfully")

      return true;
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {updateAuthor, loading}
};

export default useUpdateAuthor;
