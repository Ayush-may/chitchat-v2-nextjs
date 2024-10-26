"use client"
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { TokenClient } from "./TokenProvider";
import { createContext, useContext, useEffect, useState } from "react";

const TokenClient = createContext();

const QueryClientContainer = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const newToken = localStorage.getItem("token");
    setToken(newToken);
  }, []);

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  const clearToken = () => {
    setToken(null);
    localStorage.clear();
  }

  return (
    <QueryClientProvider client={new QueryClient()}>
      <TokenClient.Provider value={{ token, saveToken, clearToken }} >
        {children}
      </TokenClient.Provider>
    </QueryClientProvider>
  )
}

export default QueryClientContainer;

export const useAuth = () => {
  return useContext(TokenClient);
}