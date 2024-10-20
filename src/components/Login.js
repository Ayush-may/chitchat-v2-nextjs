import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_TODOS } from "@/queries/query";

export default function Login() {
    const { data, loading } = useQuery(GET_TODOS);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register,
        handleSubmit,
        setError,
        watch,
        formState: {
            errors
        } } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        router.prefetch('/chat');

        toast.promise(
            axios.post('/api/user/login?skip_token_validation=true', {
                username: watch("username"),
                password: watch("password")
            }),
            {
                loading: "Loading...",
                success: (data) => {
                    console.log(data);
                    if (data.statusText === "OK") {
                        router.push('/chat');
                    }
                    return `Logged in!`
                },
                error: "Something went wrong!"
            }
        );

        setIsSubmitting(false);
    }

    if (loading)
        return <p>Loading...</p>

    return (
        <div className="w-full border grid md:grid-cols-2 grid-cols-1 border-stone-400 bg-white">
            <form onSubmit={handleSubmit(onSubmit)}
                className="p-5 flex flex-col gap-5">
                <Label className="text-3xl text-center font-bold uppercase">Login.</Label>

                <Label className="-mb-4 text-sm text-slate-700">Username</Label>
                <Input
                    type="text"
                    id="username"
                    placeholder="username"
                    className="bg-stone-100 border-blue-200 rounded-none"
                    {...register('username', { required: 'username is required' })}
                />
                {errors.username && <Label className="-mt-4 text-sm text-red-500">{errors.username.message}</Label>}

                <Label className="-mb-4 text-sm text-slate-700">Password</Label>
                <Input
                    type="password"
                    id="password"
                    placeholder="password"
                    className="bg-stone-100 border-blue-200 rounded-none"
                    {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <Label className="-mt-4 text-sm text-red-500">{errors.password.message}</Label>}

                <Button
                    type="submit"
                    className="rounded-none"
                    disabled={isSubmitting}
                >Login</Button>
            </form>
            <div className="overflow-hidden w-full h-full md:block hidden relative">
                {/* <img src={"https://placehold.co/600x400"} className="object-cover w-full h-full" /> */}
                <h1 className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-8xl uppercase font-bold text-nowrap text-slate-900">Login.</h1>
                <img
                    src={"https://img.freepik.com/free-photo/anime-eyes-illustration_23-2151660525.jpg?t=st=1727293390~exp=1727296990~hmac=9107d56b2ad63f9f0a1156c714bf7f4961c8e152365f1345d4ab36aabcbaaaea&w=900"}
                    className="object-cover w-full h-full" />
            </div>
        </div>
    )
}