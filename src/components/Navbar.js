"use client"

import { useState } from "react";
import NavLink from "./NavLink"
import { Button } from "./ui/button";
import { AlignJustify } from "lucide-react";
import Sidebar from "./Sidebar";


export default function Navbar() {
    const [isShow, setIsShow] = useState(false);

    return (
        <>

            <nav className="md:flex p-5 items-center justify-between shadow-lg px-10 py-6 relative">
                <div className="flex justify-between w-full">
                    <h1 className="font-bold text-2xl md:text-4xl">SocialMedia.</h1>
                    <div className="md:flex hidden items-center">
                        <NavLink href={"/"}>Home</NavLink>
                        <NavLink href={"/about-us"}>About us</NavLink>
                        <NavLink href={"/contact-us"}>Contact us</NavLink>
                        {/* <Button className="rounded-none">Login</Button> */}
                    </div>
                    {/* <Button
                        className="block md:hidden rounded-none"
                        type="button"
                        variant="outline"
                        onClick={() => setIsShow(prev => !prev)}
                    >
                        <AlignJustify />
                    </Button> */}
                    <Sidebar />
                </div>
            </nav>
        </>
    )
}