import Head from "next/head";
import HeroSection from "../Components/HeroSection/index"

export default function Home() {
  return (
    <>
      <Head>
        <title>The Essentials</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-[700] text-4xl">
        <HeroSection/>
      </main>
    </>
  );
}
