import Mytabs from "@/components/Mytabs";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Index() {
    return (
        <main className="w-full h-full flex flex-col">
            <Navbar />
            <div className="p-4 flex-1 pattern-cross-dots-lg w-full flex justify-center">
                <Mytabs />
            </div>
        </main>
    )
}