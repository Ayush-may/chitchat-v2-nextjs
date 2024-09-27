"use client"

import Index from ".";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function Home() {
    return (
        <Provider store={store}>
            <Index />
        </Provider>
    );
}
