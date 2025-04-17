'use client'
import { useEffect } from "react";
import ChatInterface from "./Chat-Interface";

export default function Page() {
  useEffect(() => {
    document.title = "Chat | SIMPLE CHAT APP"
  }, [])

  return (
    <>
      <ChatInterface />
    </>
  );
}
