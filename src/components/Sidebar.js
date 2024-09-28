import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { AlignJustify } from "lucide-react";
import NavLink from "./NavLink";

export default function Sidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    className="block md:hidden rounded-none"
                    type="button"
                    variant="ghost"
                >
                    <AlignJustify />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <div className="w-full flex flex-col">
                    <NavLink href={"/"}>Home</NavLink>
                    {/* <NavLink href={"/about-us"}>About us</NavLink> */}
                    <NavLink href={"/contact-us"}>Contact us</NavLink>
                </div>
            </SheetContent>
        </Sheet>
    )
}