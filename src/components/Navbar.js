import NavLink from "./NavLink"
import { Button } from "./ui/button";
import { AlignJustify } from "lucide-react";


export default function Navbar() {
    return (
        <nav className="flex p-5 items-center justify-between shadow-lg px-10 py-6">
            <h1 className="font-bold text-2xl md:text-4xl">SocialMedia.</h1>
            <div className="md:flex gap-6 hidden items-center">
                <NavLink href={"/"}>Home</NavLink>
                <NavLink href={"/about-us"}>About us</NavLink>
                <NavLink href={"/contact-us"}>Contact us</NavLink>
                {/* <Button className="rounded-none">Login</Button> */}
            </div>
            <Button className="block md:hidden rounded-none" type="button">
                <AlignJustify />
            </Button>
        </nav>
    )
}