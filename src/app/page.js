"use client"

import Mytabs from "@/components/Mytabs";
import Navbar from "@/components/Navbar";
import { jwtDecode } from "jwt-decode";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useLayoutEffect, useState } from "react";

export const IsLoggingContext = createContext();

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    router.prefetch("/chat");
  }, []);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token") || undefined;
    setIsLoading(true);

    if (token) {
      try {
        const decodeToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodeToken.exp < currentTime)
          throw new Error("Token is Expired");

      } catch (error) {
        setIsLoading(false);
        localStorage.clear();

        return;
      }
      router.push('/chat');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) return (
    <div className="flex flex-col text-center w-full h-full justify-center items-center text-gray-500">
      <div className="flex items-center gap-1">
        <Loader2 className="animate-spin w-5 h-5" />
        <p>Loading...</p>
      </div>
      <p>(If this takes too long, please refresh the page.)</p>
    </div>
  )

  return (
    <>
      {
        isLogging
          ?
          <div className="flex flex-col text-center w-full h-full justify-center items-center text-gray-500">
            <div className="flex items-center gap-1">
              <Loader2 className="animate-spin w-5 h-5" />
              <p>Logging...</p>
            </div>
            <p>(If this takes too long, please refresh the page.)</p>
          </div>
          :
          isLoading
            ?
            <p>Loading...</p> :
            <main className="w-full h-full flex flex-col">
              <Navbar />
              <div className="p-4 flex-1 pattern-cross-dots-lg w-full flex justify-center">
                <IsLoggingContext.Provider value={{ setIsLogging }} >
                  <Mytabs />
                </IsLoggingContext.Provider>
              </div>
            </main>

      }
    </>
  );
}
