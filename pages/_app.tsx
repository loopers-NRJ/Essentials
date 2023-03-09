import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../src/Components/Common/Layout";
import { Montserrat } from "@next/font/google";
import { SessionProvider } from "next-auth/react";

const font = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

export default function App({ Component, pageProps, session }: any) {
  return (
    <SessionProvider session={session}>
      <main className={`${font.variable} font-sans`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </SessionProvider>
  );
}
