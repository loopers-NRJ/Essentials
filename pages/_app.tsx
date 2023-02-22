import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../Components/Layout";
import { Montserrat } from "@next/font/google";

const font = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={`${font.variable} font-sans`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </>
  );
}
