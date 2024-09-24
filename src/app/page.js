import Login from "@/components/Login";
import NavLink from "@/components/NavLink";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <main className="w-full h-full flex flex-col">
            <nav className="flex p-5 items-center justify-between shadow-lg px-10 py-6">
                <h1 className="font-bold text-4xl">SocialMedia.</h1>
                <div className="flex gap-6 items-center">
                    <NavLink href={"/"}>Home</NavLink>
                    <NavLink href={"/about-us"}>About us</NavLink>
                    <NavLink href={"/contact-us"}>Contact us</NavLink>
                    <Button className="">Login</Button>
                </div>
            </nav>

            <div className="p-4 border flex-1 pattern-cross-dots-md">
                <Login />
            </div>
        </main>
    );
}
