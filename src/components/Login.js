import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/lib/resolverClient";
import { Loader2 } from "lucide-react";

export default function Login() {
    const [login, { data, loading }] = useMutation(LOGIN);

    const { register,
        handleSubmit,
        watch,
        formState: {
            errors
        } } = useForm();
    const router = useRouter();

    useEffect(() => {
        router.prefetch('/chat');
    }, [])

    const onSubmit = async (data) => {
        const { username, password } = data;

        toast.promise(
            login({
                variables: {
                    username: username.toLowerCase(),
                    password
                }
            })
            ,
            {
                loading: "Logging...",
                success: ({ data }) => {
                    const { token, uid } = data.login.user;

                    if (!token)
                        throw new Error();

                    localStorage.setItem("token", token);
                    localStorage.setItem("uid", uid);
                    router.push("/chat");

                    return "Logged in!"
                },
                error: "Something went wrong"
            }
        );
    }

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
                    disabled={loading}
                >
                    {
                        loading
                            ? <Loader2 className="animate-spin" />
                            : "Login"
                    }
                </Button>
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