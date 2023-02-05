import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer position="bottom-center"/>
    </SessionContextProvider>
  );
}
