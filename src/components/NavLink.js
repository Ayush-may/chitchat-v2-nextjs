"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({href, children}){
    const path = usePathname();
    const isActive = path === href;

    return (
        <>
            <Link href={href} passHref>
                <p className={`text-xl ${isActive ? "text-red-500" : "text-black"}`}>
                    {children}
                </p>
            </Link>
        </>
    )
}