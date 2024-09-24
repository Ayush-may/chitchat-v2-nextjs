import Login from "@/components/Login";
import NavLink from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export default function Home() {
    return (
        <main className="w-full h-full flex flex-col">
            <nav className="flex p-5 items-center justify-between shadow-lg px-10 py-6">
                <h1 className="font-bold text-4xl">SocialMedia.</h1>
                <div className="flex gap-6 items-center">
                    <NavLink href={"/"}>Home</NavLink>
                    <NavLink href={"/about-us"}>About us</NavLink>
                    <NavLink href={"/contact-us"}>Contact us</NavLink>
                    <Button className="rounded-none">Login</Button>
                </div>
            </nav>

            <div className="p-4 flex-1 pattern-cross-dots-md w-full flex justify-center">
                <Tabs defaultValue="login" className="w-10/12">
                    <TabsList className="grid w-full grid-cols-2 bg-black text-white p-1">
                        <TabsTrigger value="login" className="">Login</TabsTrigger>
                        <TabsTrigger value="signup">Login</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <Login />
                    </TabsContent>
                    <TabsContent value="signup">
                        this is signup
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}
