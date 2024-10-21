"use client"
import Mytabs from "@/components/Mytabs";
import Navbar from "@/components/Navbar";
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
      router.push('/chat');
    }
    else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <main className="w-full h-full flex flex-col">
        <Navbar />
        <div className="p-4 flex-1 pattern-cross-dots-lg w-full flex justify-center">
          <Mytabs />
        </div>
      </main>
    </>
  );
}
