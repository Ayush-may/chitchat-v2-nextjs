"use client"

import Mytabs from "@/components/Mytabs";
import Navbar from "@/components/Navbar";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      {
        isLoading ?
          <p>Loading...</p> :
          <main className="w-full h-full flex flex-col">
            <Navbar />
            <div className="p-4 flex-1 pattern-cross-dots-lg w-full flex justify-center">
              <Mytabs />
            </div>
          </main>

      }
    </>
  );
}
