import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import Head from "next/head";

export default function Forgetpassword() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register,
        handleSubmit,
        setError,
        formState: {
            errors
        } } = useForm();

    const onSubmit = (data) => {
        setIsSubmitting(true);

        const promise = new Promise((solve, error) => setTimeout(() => {
            solve({ name: "Ayush Sharma" })
        }, 2000));

        toast.promise(promise, {
            loading: "Loading...",
            success: (data) => {
                setIsSubmitting(false);
                return "Password is changed!"
            },
            error: () => {
                setIsSubmitting(false);
                return "Something went wrong!"
            }
        });
    }

    return (
        <>
            <div className="w-full h-fit border flex justify-center border-stone-400 bg-white">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-5 max-w-lg flex flex-col items-center gap-5"
                >
                    <Label className="text-3xl text-center font-bold uppercase">Forget Password.</Label>
                    <Label className="-mb-4 text-sm text-slate-700 self-start">Username</Label>
                    <Input type="text" id="username" placeholder="username" className="bg-stone-100 border-blue-200 rounded-none"
                        {...register('username', { required: "username is required!" })}
                    />
                    {errors.username && <Label className="-mt-4 text-sm text-red-500 justify-self-start w-full">{errors.username.message}</Label>}


                    <Label className="-mb-4 text-sm text-slate-700 self-start">Password</Label>
                    <Input type="text" id="password" placeholder="password" className="bg-stone-100 border-blue-200 rounded-none"
                        {...register('password', { required: "password is required!" })}
                    />
                    {errors.password && <Label className="-mt-4 text-sm text-red-500 justify-self-start w-full">{errors.password.message}</Label>}

                    {/* <Label className="-my-2 text-sm">Forget password</Label> */}
                    <Button
                        type="submit"
                        className="rounded-none w-full"
                        disabled={isSubmitting}
                    >Change password</Button>
                </form>
            </div>
        </>
    )
}