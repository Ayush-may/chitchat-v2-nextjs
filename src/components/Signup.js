import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsTrigger } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";


export default function Signup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register,
    handleSubmit,
    setError,
    watch,
    reset,
    clearErrors,
    formState: {
      errors
    } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const { username, password } = data;

    toast.promise(
      axios.post("/api/user", {
        username, password
      }),
      {
        loading: "Loading...",
        success: (data) => {
          if (data.statusText == "OK") {
            reset();
          }

          return "User has been created successfully!";
        },
        error: "Something went wrong!"
      }
    );

    setIsSubmitting(false);
  }

  useEffect(() => {
    if (watch("username").length >= 5) {
      let temp = setTimeout(async () => {
        try {
          let response = await axios.post("/api/user/check-username", {
            username: watch("username")
          });

          clearErrors("username");
          setIsSubmitting(false);

        } catch (error) {

          setError("username", {
            type: "manual",
            message: "Username is already taken",
          });
          setIsSubmitting(true);

        }
      }, 500);

      return () => {
        clearTimeout(temp);
      }
    }
  }, [watch("username")]);

  return (
    <div className="w-full max-h-fit border border-dark grid md:grid-cols-2 grid-cols-1  border-stone-400 bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 order-2 flex flex-col h-fit gap-5"
        autoComplete="off"
      >
        <Label className="text-3xl text-center font-bold uppercase">Sign up</Label>
        <Label className="-mb-4 text-sm text-slate-700">Username</Label>
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
        {errors.username && <Label className="-mt-4 text-sm text-red-500">{errors.username.message}</Label>}

        <Label className="-mb-4 text-sm text-slate-700">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="password"
          className="bg-stone-100 border-blue-200 rounded-none"
          {...register('password', { required: "Password is required" })}
        />
        {errors.password && <Label className="-mt-4 text-sm text-red-500">{errors.password.message}</Label>}

        <Button type="submit" className="rounded-none" disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create an account"}</Button>
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