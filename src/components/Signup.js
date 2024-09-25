import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsTrigger } from "@radix-ui/react-tabs";

export default function Signup() {
    return (
        <div className="w-full max-h-fit border border-dark grid md:grid-cols-2 grid-cols-1  border-stone-400 bg-white">
            <form className="p-5 order-2 flex flex-col h-fit gap-5">
                <Label className="text-3xl text-center font-bold uppercase">Sign up</Label>
                <Input type="text" id="username" placeholder="username" className="bg-stone-100 border-blue-200" />
                <Label className="text-sm text-red -mt-4">Forget password</Label>
                <Input type="text" id="password" placeholder="password" className="bg-stone-100 border-blue-200" />
                <Button type="submit" className="rounded-none">Create an account</Button>
            </form>
            <div className="overflow-hidden order-1 w-full h-full md:block hidden relative">
                {/* <img src={"https://placehold.co/600x400"} className="object-cover object-center w-full h-full" /> */}
                <h1 className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-8xl uppercase font-bold text-nowrap text-slate-900">Sign up.</h1>
                <img
                    src={"https://img.freepik.com/free-photo/anime-eyes-illustration_23-2151660474.jpg?t=st=1727293669~exp=1727297269~hmac=352eb73f8f3d4ab7b99a47b36f3620c648254f527b873d3e5991d8808ca6bf3f&w=900"}
                    className="object-cover object-center w-full h-full" />
            </div>
        </div>
    )
}