import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  fullName: string;
  userName: string;
  email?: string;
  imageFile?: File;
  id: string;
};

const useUpdateAuthor = () => {
  const [loading, setLoading] = useState(false);

  const updateAuthor = async ({ id, fullName, userName, email, imageFile }: Props) => {
    setLoading(true);
    const formData = new FormData();

    // Append text fields
    formData.append("fullName", fullName);
    formData.append("userName", userName);
    if (email) formData.append("email", email);

    // Append file if exists
    if (imageFile) formData.append("imageFile", imageFile);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_USERPROFILE}/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Updated Successfully");

      return true;
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateAuthor, loading };
};

export default useUpdateAuthor;
