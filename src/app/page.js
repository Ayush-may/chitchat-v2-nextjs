import Mytabs from "@/components/Mytabs";
import NavLink from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";

export default function Home() {
    return (
        <main className="w-full h-full flex flex-col">
            <nav className="flex p-5 items-center justify-between shadow-lg px-10 py-6">
                <h1 className="font-bold text-4xl">SocialMedia.</h1>
                <div className="md:flex gap-6 hidden items-center">
                    <NavLink href={"/"}>Home</NavLink>
                    <NavLink href={"/about-us"}>About us</NavLink>
                    <NavLink href={"/contact-us"}>Contact us</NavLink>
                    <Button className="rounded-none">Login</Button>
                </div>
                <Button className="block md:hidden rounded-none" type="button">
                    <AlignJustify />
                </Button>
            </nav>

            <div className="p-4 flex-1 pattern-cross-dots-md w-full flex justify-center">
                <Mytabs />
            </div>
        </main>
    );
}
