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
            <div className="overflow-hidden order-1 w-full h-fit md:block hidden">
                <img src={"https://placehold.co/600x400"} className="object-cover object-center w-full h-full" />
            </div>
        </div>
    )
}