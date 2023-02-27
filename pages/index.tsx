import Head from "next/head";
import HeroSection from "../src/Components/HomePage/HeroSection";
import BestSellingSection from "../src/Components/HomePage/BestSellingSection";
import WhoWeAreSection from "../src/Components/HomePage/WhoWeAreSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>The Essentials</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeroSection />
        <BestSellingSection />
        <WhoWeAreSection />
      </main>
    </>
  );
}
