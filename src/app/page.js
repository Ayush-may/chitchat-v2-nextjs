"use client"

import Index from "./Index";
import { Provider } from "react-redux";
import store from "@/store/store";
import { Toaster } from "sonner";

export default function Home() {
    return (
        <Provider store={store}>
            <Index />
            <Toaster position="top-center" richColors />
        </Provider>
    );
}
