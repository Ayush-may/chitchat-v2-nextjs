import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useAuth } from "./QueryClientContainer";
import axiosConfig from "@/lib/axiosConfig";

const createUser = async ({ username, password }) => {
  try {
    const res = await axiosConfig.post("users/", {
      username,
      password
    });

    if (res.status !== 200)
      throw new Error("User is not created!");

    return res.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export default function Signup() {
  const createUserMutation = useMutation(createUser);
  const { saveToken } = useAuth();

  const { register,
    handleSubmit,
    formState: {
      errors
    } } = useForm();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/chat");
  }, [])

  const onSubmit = async (data) => {
    toast.promise(
      createUserMutation.mutateAsync(data),
      {
        loading: "Loading...",
        success: ({ uid, token }) => {
          localStorage.clear();
          localStorage.setItem("token", token);
          localStorage.setItem("uid", uid);
          saveToken(token);
          router.push("/chat");

          return "User has been created successfully!";
        },
        error: "An error occurred while processing your login request. Please try again or refresh page."
      });
  }

  return (
    <div className="w-full max-h-fit border border-dark grid md:grid-cols-2 grid-cols-1  border-stone-400 bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 order-2 flex flex-col gap-2 border h-full"
        autoComplete="off"
      >
        <Label className="text-3xl text-center font-bold uppercase">Sign up</Label>
        <Label className="-mb-1 text-sm text-slate-700">Username</Label>
        <Input
          type="text"
          id="username"
          placeholder="username"
          className="bg-stone-100 border-blue-200 rounded-none"
          {...register('username', {
            required: "Username is required",
            minLength: {
              value: 5,
              message: "The username must be at least 5 characters in length."
            }
          })}
        />
        {errors.username && <Label className="text-sm text-red-500">{errors.username.message}</Label>}

        <Label className="-mb-1 text-sm text-slate-700 mt-3">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="password"
          className="bg-stone-100 border-blue-200 rounded-none"
          {...register('password', { required: "Password is required" })}
        />
        {errors.password && <Label className="text-sm text-red-500">{errors.password.message}</Label>}

        <Button type="submit" className="rounded-none mt-3" disabled={createUserMutation.isLoading}>
          {
            createUserMutation.isLoading
              ? <Loader2 className="animate-spin" />
              : "Create an account"
          }
        </Button>
      </form>
      <div className="overflow-hidden order-1 w-full h-full md:block hidden relative">
        {/* <img src={"https://placehold.co/600x400"} className="object-cover object-center w-full h-full" /> */}
        <h1 className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-8xl uppercase font-bold text-center text-slate-900">Sign up.</h1>
        <img
          src={"https://img.freepik.com/free-photo/anime-eyes-illustration_23-2151660474.jpg?t=st=1727293669~exp=1727297269~hmac=352eb73f8f3d4ab7b99a47b36f3620c648254f527b873d3e5991d8808ca6bf3f&w=900"}
          className="object-cover object-center w-full h-full" />
      </div>
    </div>
  )
}