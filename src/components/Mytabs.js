"use client"

import Forgetpassword from "@/components/Forgetpassword";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";

export default function Mytabs() {
    const [selected, setSelected] = useState("tab1");

    const handleSelection = (tab) => {
        setSelected(tab);
    }

    const handleCss = (tab) => {
        return selected == tab ? "bg-slate-500 text-whites rounded-sm" : " text-whites";
    }

    return (
        <Tabs defaultValue="login" className="w-10/12 h-fit">
            <TabsList className="grid w-full grid-cols-3 bg-slate-900 text-white py-1.5 px-2 mb-2">
                <TabsTrigger value="login"
                    className={`${handleCss("tab1")}`}
                    onClick={() => handleSelection("tab1")}
                >Login</TabsTrigger>
                <TabsTrigger value="signup"
                    className={`${handleCss("tab2")}`}
                    onClick={() => handleSelection("tab2")}
                >Sign up</TabsTrigger>
                <TabsTrigger value="forgetpassword"
                    className={`${handleCss("tab3")}`}
                    onClick={() => handleSelection("tab3")}
                >Forget Password</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Login />
            </TabsContent>
            <TabsContent value="signup" className="h-fit">
                <Signup />
            </TabsContent>
            <TabsContent value="forgetpassword">
                <Forgetpassword />
            </TabsContent>
        </Tabs>
    )
}