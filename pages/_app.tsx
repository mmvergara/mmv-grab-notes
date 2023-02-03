import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
      <Navbar />
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
