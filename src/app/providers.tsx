'use client';

import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { store } from "@/store/store";

export function Providers({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <ReduxProvider store={store}>
            <ThemeProvider enableSystem={true} defaultTheme="system">
                { children }
            </ThemeProvider>
        </ReduxProvider>)
};
