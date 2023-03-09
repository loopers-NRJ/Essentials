import Head from "next/head";
import CustomerReviewSection from "../src/Components/HomePage/CustomerReviewSection";
import WhoWeAreSection from "../src/Components/HomePage/WhoWeAreSection";
import CustomizeSection from "../src/Components/HomePage/CustomizeSection";
import HeroSection from "../src/Components/HomePage/HeroSection";
import BestSellingSection from "../src/Components/HomePage/BestSellingSection";

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
        <CustomizeSection />
        <WhoWeAreSection />
        <CustomerReviewSection />
        
        

      
        


      </main>
    </>
  );
}
