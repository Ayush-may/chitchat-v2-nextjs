import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Login() {
    return (
        <div className="w-full h-fit border grid md:grid-cols-2 grid-cols-1  border-stone-400 bg-white">
            <form className="p-5 h-fit flex flex-col gap-5 border border-black">
                <Label className="text-3xl text-center font-bold uppercase">Login.</Label>
                <Input type="text" id="username" placeholder="username" className="bg-stone-100 border-blue-200" />
                <Input type="text" id="password" placeholder="password" className="bg-stone-100 border-blue-200" />
                {/* <Label className="-my-2 text-sm">Forget password</Label> */}
                <Button type="submit" className="rounded-none">Login</Button>
            </form>
            <div className="overflow-hidden w-full  md:block hidden relative">
                {/* <img src={"https://placehold.co/600x400"} className="object-cover w-full h-full" /> */}
                <h1 className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-8xl uppercase font-bold text-nowrap text-slate-900">Login.</h1>
                <img
                    src={"https://img.freepik.com/free-photo/anime-eyes-illustration_23-2151660525.jpg?t=st=1727293390~exp=1727296990~hmac=9107d56b2ad63f9f0a1156c714bf7f4961c8e152365f1345d4ab36aabcbaaaea&w=900"}
                    className="object-cover w-full h-fit" />
            </div>
        </div>
    )
}