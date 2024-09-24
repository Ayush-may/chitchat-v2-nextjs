import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function Login() {
    return (
        <div className="w-3/4 border grid grid-cols-2 border-black bg-white">
            <form className="p-5 grid">
                <Input type="text" id="username" placeholder="username" className="bg-stone-100 border-blue-200" />
            </form>
            <div className="overflow-hidden w-full h-full">
                <img src={"https://placehold.co/600x400"} className="object-cover w-full h-full" />
            </div>
        </div>
    )
}