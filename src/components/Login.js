import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Login() {
    return (
        <div className="w-full h-fit border grid md:grid-cols-2 grid-cols-1  border-stone-400 bg-white">
            <form className="p-5 flex flex-col gap-5">
                <Label className="text-3xl text-center font-bold uppercase">Login.</Label>
                <Input type="text" id="username" placeholder="username" className="bg-stone-100 border-blue-200" />
                <Input type="text" id="password" placeholder="password" className="bg-stone-100 border-blue-200" />
                <Label className="-my-2 text-sm">Forget password</Label>
                <Button type="submit" className="rounded-none">Login</Button>
            </form>
            <div className="overflow-hidden w-full h-full md:block hidden">
                <img src={"https://placehold.co/600x400"} className="object-cover w-full h-full" />
            </div>
        </div>
    )
}