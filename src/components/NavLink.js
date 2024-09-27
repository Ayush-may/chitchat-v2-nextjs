"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function NavLink({ href, children }) {
    const path = usePathname();
    const isActive = path === href;

    return (
        <>
            <Link href={href} className="" passHref>
                <Button
                    className={`text-xl ${isActive ? "text-red-500" : "text-black"}`}
                    variant="ghost"
                >
                    {children}
                </Button>
            </Link>
        </>
    )
}