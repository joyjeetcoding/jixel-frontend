"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import JoditEditor from "jodit-react";
import "../../components/stylesforEditor/styles.scss";
import { useCreatePost } from "@/hooks/useCreatePost";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Please provide the Title",
  }),
  summary: z
    .string()
    .min(1, {
      message: "Please Provide the Summary",
    })
    .max(250, "Must not exceed 250 characters"),
  imgUrl: z.instanceof(File, {
    message: "Please give an Image",
  }),
  description: z.string().min(1, {
    message: "Please write a descriptive text",
  }),
});

type PostsFormData = z.infer<typeof formSchema>;

const CreatePostsPage = () => {
  const form = useForm<PostsFormData>({
    resolver: zodResolver(formSchema),
  });

  const { createPost } = useCreatePost();

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { handleSubmit, watch } = form;

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/
      placeholder: "Start typing...",
      tabIndex: 1,
      additionalStyles: `
      .jodit-wysiwyg {
        padding-left: 10px;
      }
      ul {
        list-style: inside;
      }
      ol {
        list-style: inside;
        list-style-type: number;
      }
      td {
        border: solid 1px;
      }
    `,
    }),
    []
  );

  const onSubmit = async (data: PostsFormData) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("description", content);
    // Append file input if it exists
    if(data.imgUrl)
      formData.append("imgUrl", data.imgUrl)

    // Log FormData to debug
    

    console.log(formData);

    try {
      await createPost(formData);
      console.log("Posted Successfully");
    } catch (error) {
      console.log("Error Creating Post", error);
    }
  };

  return (
    <div className="md:max-w-3xl lg:max-w-6xl md:mx-auto ">
      <h1 className="text-3xl font-extrabold text-center font-btnfont my-4">
        Create Your Posts Here
      </h1>
      <div>
        <Form {...form}>
          <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Student raised security concerns in Mobile Guardian MDM weeks before cyberattack"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      cols={10}
                      {...field}
                      placeholder="A person claiming to be a student in Singapore publicly posted documentation showing lax security in a widely popular school mobile device management service called Mobile Guardian, weeks before a cyberattack on the company."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imgUrl"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => {
                        field.onChange(
                          e.target.files ? e.target.files[0] : null
                        )
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <JoditEditor
                      {...field}
                      ref={editor}
                      value={content}
                      config={config}
                      onBlur={(newContent) => setContent(newContent)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full my-5">Create Jixel</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePostsPage;
