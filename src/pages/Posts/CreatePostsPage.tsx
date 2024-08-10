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
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Please provide the Title",
  }),
  summary: z.string().min(1, {
    message: "Please Provide the Summary",
  }),
  imgPost: z.instanceof(File).optional(),
  description: z.string().min(1, {
    message: "Please write the Descriptive Post",
  }),
});

type PostsFormData = z.infer<typeof formSchema>;

const CreatePostsPage = () => {
  const form = useForm<PostsFormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="md:max-w-3xl lg:max-w-6xl md:mx-auto ">
      <h1 className="text-3xl font-extrabold text-center font-btnfont my-4">
        Create Your Posts Here
      </h1>
      <div>
        <Form {...form}>
          <form className="p-4">
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
                      placeholder="A person claiming to be a student in Singapore publicly posted documentation showing lax security in a widely popular school mobile device management service called Mobile Guardian, weeks before a cyberattack on the company resulted in the mass-wiping of student devices and widespread disruption."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imgPost"
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
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full my-5">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePostsPage;
